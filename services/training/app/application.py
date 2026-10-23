from .contracts import ExperimentRepository
from .pipeline import train_baseline


class TrainingService:
    def __init__(self, repository: ExperimentRepository):
        self.repository = repository

    def create_experiment(self, dataset_csv: str, seed: int) -> dict:
        result = train_baseline(dataset_csv, seed)
        experiment_id = self.repository.save(result)
        return {
            "id": experiment_id,
            "datasetSha256": result.dataset_sha256,
            "model": result.model,
            "metrics": result.metrics,
        }

    def get_experiment(self, experiment_id: str) -> dict | None:
        return self.repository.get(experiment_id)

    def check(self) -> None:
        self.repository.check()
