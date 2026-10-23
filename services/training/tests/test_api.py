import unittest
from unittest.mock import MagicMock, patch
from fastapi.testclient import TestClient
import test_pipeline

from app.api import create_app
from app.application import TrainingService
from app.contracts import RepositoryUnavailable, ExperimentRepository


class TrainingAPITests(unittest.TestCase):
    def setUp(self):
        self.repository = MagicMock(spec=ExperimentRepository)
        self.client = TestClient(create_app(TrainingService(self.repository)))

    def test_real_pipeline_returns_experimental_model_and_persists(self):
        csv = test_pipeline.PipelineTests().fixture().to_csv(index=False)
        with patch.object(
            self.repository, "save", return_value="experiment-test"
        ) as save:
            response = self.client.post("/v1/experiments", json={"dataset_csv": csv})
        self.assertEqual(response.status_code, 201)
        self.assertFalse(response.json()["model"]["validatedForProduction"])
        self.assertEqual(response.json()["metrics"]["split"], "participant-holdout")
        save.assert_called_once()

    def test_invalid_csv_is_rejected_before_persistence(self):
        with patch.object(self.repository, "save") as save:
            response = self.client.post(
                "/v1/experiments", json={"dataset_csv": "image,label\nprivate.jpg,A"}
            )
        self.assertEqual(response.status_code, 422)
        save.assert_not_called()

    def test_storage_failure_does_not_claim_success(self):
        csv = test_pipeline.PipelineTests().fixture().to_csv(index=False)
        with patch.object(
            self.repository,
            "save",
            side_effect=RepositoryUnavailable("private-details"),
        ):
            response = self.client.post("/v1/experiments", json={"dataset_csv": csv})
        self.assertEqual(response.status_code, 503)
        self.assertNotIn("private-details", response.text)

    def test_unknown_experiment_and_invalid_uuid(self):
        with patch.object(self.repository, "get", return_value=None):
            response = self.client.get(
                "/v1/experiments/00000000-0000-0000-0000-000000000000"
            )
        self.assertEqual(response.status_code, 404)
        self.assertEqual(self.client.get("/v1/experiments/not-a-uuid").status_code, 422)

    def test_health_does_not_access_repository(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.repository.check.assert_not_called()

    def test_ready_checks_repository_and_reports_unavailability(self):
        self.assertEqual(self.client.get("/ready").status_code, 200)
        self.repository.check.assert_called_once()
        self.repository.check.side_effect = RepositoryUnavailable("private-connection")
        response = self.client.get("/ready")
        self.assertEqual(response.status_code, 503)
        self.assertNotIn("private-connection", response.text)
