"""Convert SpellNet from Keras to ONNX and verify numerical equivalence."""

import os

os.environ.setdefault("TF_CPP_MIN_LOG_LEVEL", "2")
os.environ.setdefault("TF_NUM_INTEROP_THREADS", "1")
os.environ.setdefault("TF_NUM_INTRAOP_THREADS", "1")
os.environ.setdefault("OMP_NUM_THREADS", "1")
from pathlib import Path
import argparse, hashlib, json
import numpy as np
import tensorflow as tf
import tf2onnx
import onnxruntime as ort

parser = argparse.ArgumentParser()
parser.add_argument("keras_file", type=Path)
parser.add_argument("output_dir", type=Path)
args = parser.parse_args()
args.output_dir.mkdir(parents=True, exist_ok=True)
model = tf.keras.models.load_model(args.keras_file, compile=False, safe_mode=True)
signature = [tf.TensorSpec([1, 224, 224, 3], tf.float32, name="image")]


@tf.function(input_signature=signature)
def forward(image):
    return {"probabilities": model(image, training=False)}


destination = args.output_dir / "spellnet-libras.onnx"
tf2onnx.convert.from_function(
    forward, input_signature=signature, opset=17, output_path=str(destination)
)
session = ort.InferenceSession(str(destination), providers=["CPUExecutionProvider"])
rng = np.random.default_rng(42)
max_error = 0.0
for image in [
    np.zeros((1, 224, 224, 3), dtype=np.float32),
    rng.uniform(-1, 1, (1, 224, 224, 3)).astype(np.float32),
]:
    expected = model(image, training=False).numpy()
    actual = session.run(None, {session.get_inputs()[0].name: image})[0]
    np.testing.assert_allclose(actual, expected, atol=1e-5, rtol=1e-4)
    assert int(actual.argmax()) == int(expected.argmax())
    max_error = max(max_error, float(np.abs(actual - expected).max()))
manifest = {
    "name": "SpellNet Libras",
    "version": "spellnet-onnx-v1",
    "source": "https://huggingface.co/RAIA-BRASIL/spellnet_libras",
    "sourceCode": "https://github.com/gruporaia/SpellNet",
    "authors": "RAIA / SignLink",
    "labels": list("ABCDEFGILMNOPQRSTUVWY"),
    "input": {
        "shape": [1, 224, 224, 3],
        "layout": "NHWC",
        "channels": "BGR",
        "normalization": "pixel / 127.5 - 1",
        "cropPaddingPixels": 100,
        "landmarks": "red points and green connections at 224px",
    },
    "sourceSha256": hashlib.sha256(args.keras_file.read_bytes()).hexdigest(),
    "onnxSha256": hashlib.sha256(destination.read_bytes()).hexdigest(),
    "conversionMaxAbsoluteError": max_error,
    "limitations": "21 static classes; no H, J, K, X, Z. Softmax is not calibrated confidence. License not explicitly specified upstream. No independent quality validation.",
}
assert len(manifest["labels"]) == 21
(args.output_dir / "manifest.json").write_text(
    json.dumps(manifest, ensure_ascii=False, indent=2) + "\n"
)
print(
    json.dumps(
        {
            "model": str(destination),
            "bytes": destination.stat().st_size,
            "maxAbsoluteError": max_error,
            "labels": manifest["labels"],
        }
    )
)
