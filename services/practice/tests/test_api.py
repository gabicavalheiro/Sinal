import unittest
from unittest.mock import MagicMock, patch
from fastapi.testclient import TestClient

from app.api import create_app
from app.application import PracticeService
from app.domain import RepositoryUnavailable, PracticeRepository


class PracticeAPITests(unittest.TestCase):
    def setUp(self):
        self.repository = MagicMock(spec=PracticeRepository)
        self.client = TestClient(create_app(PracticeService(self.repository)))

    def test_create_returns_manual_session(self):
        with patch.object(self.repository, "save") as save:
            response = self.client.post(
                "/v1/sessions", json={"letter": "A", "attempts": 2}
            )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["evaluation"], "manual")
        self.assertEqual(response.json()["letter"], "A")
        self.assertEqual(save.call_count, 1)

    def test_invalid_attempts_never_reach_database(self):
        with patch.object(self.repository, "save") as save:
            for attempts in [0, 101, True, 1.5, "2"]:
                response = self.client.post(
                    "/v1/sessions", json={"letter": "A", "attempts": attempts}
                )
                self.assertEqual(response.status_code, 422)
            save.assert_not_called()

    def test_database_error_is_503_without_connection_details(self):
        with patch.object(
            self.repository,
            "save",
            side_effect=RepositoryUnavailable("private-connection-details"),
        ):
            response = self.client.post("/v1/sessions", json={"letter": "B"})
        self.assertEqual(response.status_code, 503)
        self.assertNotIn("private-connection-details", response.text)

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
