from contextlib import contextmanager
from sqlalchemy.exc import SQLAlchemyError
import json
from uuid import uuid4
from sqlalchemy import Engine, text
from .contracts import TrainingResult, RepositoryUnavailable


class SQLServerExperimentRepository:
    def __init__(self, engine: Engine):
        self.engine = engine

    @contextmanager
    def _transaction(self):
        try:
            with self.engine.begin() as connection:
                yield connection
        except SQLAlchemyError as error:
            raise RepositoryUnavailable("Database operation failed.") from error

    def check(self) -> None:
        with self._transaction() as connection:
            connection.execute(text("SELECT TOP 1 id FROM experiments"))

    def save(self, result: TrainingResult) -> str:
        experiment_id = str(uuid4())
        with self._transaction() as connection:
            connection.execute(
                text(
                    "IF NOT EXISTS (SELECT 1 FROM dataset_versions WITH (UPDLOCK, HOLDLOCK) WHERE sha256 = :sha) "
                    "INSERT INTO dataset_versions (sha256, row_count, participant_count) VALUES (:sha, :rows, :participants)"
                ),
                {
                    "sha": result.dataset_sha256,
                    "rows": result.rows,
                    "participants": result.participants,
                },
            )
            connection.execute(
                text(
                    "INSERT INTO experiments (id, dataset_sha256, model_json, metrics_json) "
                    "VALUES (:id, :sha, :model, :metrics)"
                ),
                {
                    "id": experiment_id,
                    "sha": result.dataset_sha256,
                    "model": json.dumps(result.model, allow_nan=False),
                    "metrics": json.dumps(result.metrics, allow_nan=False),
                },
            )
        return experiment_id

    def get(self, experiment_id: str) -> dict | None:
        with self._transaction() as connection:
            row = (
                connection.execute(
                    text(
                        "SELECT id, dataset_sha256, model_json, metrics_json, created_at "
                        "FROM experiments WHERE id = :id"
                    ),
                    {"id": experiment_id},
                )
                .mappings()
                .first()
            )
            if row is None:
                return None
            return {
                "id": row["id"],
                "datasetSha256": row["dataset_sha256"],
                "model": json.loads(row["model_json"]),
                "metrics": json.loads(row["metrics_json"]),
                "createdAt": row["created_at"],
            }
