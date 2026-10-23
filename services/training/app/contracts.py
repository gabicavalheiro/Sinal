from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True)
class TrainingResult:
    dataset_sha256: str
    rows: int
    participants: int
    model: dict
    metrics: dict


class RepositoryUnavailable(RuntimeError):
    pass


class ExperimentRepository(Protocol):
    def save(self, result: TrainingResult) -> str: ...
    def get(self, experiment_id: str) -> dict | None: ...
    def check(self) -> None: ...
