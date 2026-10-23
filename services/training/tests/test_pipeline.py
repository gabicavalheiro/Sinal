import unittest
import numpy as np
import pandas as pd
from app.pipeline import FEATURES, normalize_landmarks, train_baseline


class PipelineTests(unittest.TestCase):
    def test_normalization_is_translation_and_scale_invariant(self):
        hand = np.random.default_rng(10).normal(size=(5, 21, 3))
        expected = normalize_landmarks(hand)
        actual = normalize_landmarks(hand * 3.4 + np.array([7, -2, 1]))
        np.testing.assert_allclose(actual, expected, atol=1e-12)
        self.assertEqual(expected.shape, (5, 63))
        np.testing.assert_equal(expected[:, :3], 0)

    def test_rejects_degenerate_or_nonfinite_coordinates(self):
        for hand in [np.zeros((1, 21, 3)), np.full((1, 21, 3), np.nan)]:
            with self.assertRaises(ValueError):
                normalize_landmarks(hand)

    def fixture(self):
        rng = np.random.default_rng(42)
        bases = rng.normal(size=(2, 21, 3))
        rows = []
        for participant in range(4):
            for label, base in zip("AB", bases):
                for _ in range(12):
                    coordinates = (base + rng.normal(scale=0.01, size=(21, 3))) * (
                        participant + 1
                    ) + participant
                    rows.append(
                        {
                            "letter": label,
                            "participant_id": f"p{participant}",
                            **dict(zip(FEATURES, coordinates.ravel())),
                        }
                    )
        return pd.DataFrame(rows)

    def test_baseline_uses_participant_holdout_and_exports_finite_parameters(self):
        result = train_baseline(self.fixture().to_csv(index=False))
        self.assertEqual(result.rows, 96)
        self.assertEqual(result.metrics["testParticipants"], 1)
        self.assertEqual(result.metrics["trainParticipants"], 3)
        self.assertEqual(result.metrics["split"], "participant-holdout")
        self.assertEqual(
            result.metrics["accuracy"], 1.0
        )  # Synthetic separable fixtures only.
        self.assertFalse(result.model["validatedForProduction"])
        self.assertTrue(np.isfinite(result.model["centroids"]).all())

    def test_rejects_single_participant_and_identifier_leakage(self):
        data = self.fixture()
        data["participant_id"] = "p1"
        with self.assertRaisesRegex(ValueError, "3 participantes"):
            train_baseline(data.to_csv(index=False))
        data["participant_id"] = "nome@example.com"
        with self.assertRaisesRegex(ValueError, "pseudônimos"):
            train_baseline(data.to_csv(index=False))

    def test_rejects_extra_columns_and_missing_labels(self):
        data = self.fixture()
        data["extra"] = 0
        with self.assertRaisesRegex(ValueError, "colunas extras"):
            train_baseline(data.to_csv(index=False))
        data = self.fixture()
        data.loc[0, "letter"] = None
        with self.assertRaisesRegex(ValueError, "preenchidos"):
            train_baseline(data.to_csv(index=False))


if __name__ == "__main__":
    unittest.main()
