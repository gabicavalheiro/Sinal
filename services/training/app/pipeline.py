"""Coordinates-only research baseline. Never presented as a validated Libras model."""

from hashlib import sha256
from io import StringIO
from .contracts import TrainingResult
import numpy as np
import pandas as pd

FEATURES = [f"{axis}{point}" for point in range(21) for axis in "xyz"]
NORMALIZATION = "wrist-max-radius-v1"


def normalize_landmarks(samples: np.ndarray) -> np.ndarray:
    array = np.asarray(samples, dtype=np.float64)
    if array.ndim != 3 or array.shape[1:] != (21, 3) or len(array) == 0:
        raise ValueError("Esperado um lote com formato (n, 21, 3).")
    if not np.isfinite(array).all():
        raise ValueError("As coordenadas devem ser finitas.")
    centered = array - array[:, :1, :]
    scale = np.linalg.norm(centered, axis=2).max(axis=1)
    if (scale < 1e-8).any():
        raise ValueError("Há mãos degeneradas no dataset.")
    return (centered / scale[:, None, None]).reshape(-1, 63)


def train_baseline(csv: str, seed: int = 42) -> TrainingResult:
    try:
        frame = pd.read_csv(
            StringIO(csv), dtype={"letter": "string", "participant_id": "string"}
        )
    except (pd.errors.ParserError, pd.errors.EmptyDataError, UnicodeError) as error:
        raise ValueError("CSV inválido.") from error
    expected = {"letter", "participant_id", *FEATURES}
    if set(frame.columns) != expected:
        raise ValueError(
            "Use letter, participant_id e x0,y0,z0 até x20,y20,z20, sem colunas extras."
        )
    if frame.empty or frame[["letter", "participant_id"]].isna().any().any():
        raise ValueError("O dataset deve ter letras e participantes preenchidos.")
    if not frame["letter"].isin(list("ABCD")).all():
        raise ValueError("O baseline desta etapa aceita apenas A, B, C e D.")
    if not frame["participant_id"].str.fullmatch(r"[A-Za-z0-9_-]{1,64}").all():
        raise ValueError("Use identificadores pseudônimos, sem nomes ou e-mails.")
    try:
        coordinates = (
            frame[FEATURES]
            .apply(pd.to_numeric, errors="raise")
            .to_numpy(dtype=np.float64)
        )
    except (ValueError, TypeError) as error:
        raise ValueError("As coordenadas precisam ser numéricas.") from error
    features = normalize_landmarks(coordinates.reshape(-1, 21, 3))
    participants = np.array(sorted(frame["participant_id"].unique()))
    if len(participants) < 3:
        raise ValueError(
            "Use ao menos 3 participantes distintos para separar treino e teste."
        )
    rng = np.random.default_rng(seed)
    rng.shuffle(participants)
    holdout = participants[: max(1, len(participants) // 4)]
    test_mask = frame["participant_id"].isin(holdout).to_numpy()
    labels = frame["letter"].to_numpy(dtype=str)
    train_labels = labels[~test_mask]
    classes = sorted(set(train_labels))
    if len(classes) < 2 or set(classes) != set(labels[test_mask]):
        raise ValueError(
            "Treino e teste precisam conter as mesmas letras, com ao menos 2 classes."
        )
    if any(np.count_nonzero(train_labels == letter) < 10 for letter in classes):
        raise ValueError("Use ao menos 10 amostras de treino por letra.")
    centroids = np.stack(
        [
            features[~test_mask][train_labels == letter].mean(axis=0)
            for letter in classes
        ]
    )
    distances = np.linalg.norm(
        features[test_mask, None, :] - centroids[None, :, :], axis=2
    )
    predicted = np.asarray(classes)[distances.argmin(axis=1)]
    actual = labels[test_mask]
    accuracy = float(np.mean(predicted == actual))
    recall = {
        letter: float(np.mean(predicted[actual == letter] == letter))
        for letter in classes
    }
    model = {
        "schemaVersion": 1,
        "kind": "nearest-centroid-research-baseline",
        "normalization": NORMALIZATION,
        "features": FEATURES,
        "labels": classes,
        "centroids": centroids.tolist(),
        "validatedForProduction": False,
    }
    metrics = {
        "accuracy": accuracy,
        "macroRecall": float(np.mean(list(recall.values()))),
        "recallByLetter": recall,
        "trainRows": int((~test_mask).sum()),
        "testRows": int(test_mask.sum()),
        "trainParticipants": int(len(participants) - len(holdout)),
        "testParticipants": int(len(holdout)),
        "split": "participant-holdout",
        "seed": seed,
    }
    return TrainingResult(
        sha256(csv.encode()).hexdigest(), len(frame), len(participants), model, metrics
    )
