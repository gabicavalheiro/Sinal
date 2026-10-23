"""Local CLI for the data pipeline; does not need a running database."""

import argparse
import json
from pathlib import Path
from .pipeline import train_baseline

parser = argparse.ArgumentParser(
    description="Treina um baseline de coordenadas para experimentação."
)
parser.add_argument("csv", type=Path)
parser.add_argument("--output", type=Path, default=Path("baseline.json"))
parser.add_argument("--seed", type=int, default=42)
args = parser.parse_args()
result = train_baseline(args.csv.read_text(encoding="utf-8"), args.seed)
args.output.write_text(
    json.dumps(
        {
            "model": result.model,
            "metrics": result.metrics,
            "datasetSha256": result.dataset_sha256,
        },
        ensure_ascii=False,
        allow_nan=False,
        indent=2,
    ),
    encoding="utf-8",
)
print(
    f"Baseline experimental exportado para {args.output}. Não validado para produção."
)
