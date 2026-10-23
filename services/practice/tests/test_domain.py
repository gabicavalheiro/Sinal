import unittest
from app.domain import PracticeSession


class PracticeTests(unittest.TestCase):
    def test_session_is_manual_and_has_own_id(self):
        a = PracticeSession.create("A")
        b = PracticeSession.create("A")
        self.assertEqual(a.evaluation, "manual")
        self.assertNotEqual(a.id, b.id)

    def test_rejects_unavailable_letters_and_invalid_attempts(self):
        with self.assertRaises(ValueError):
            PracticeSession.create("Z")
        for attempts in [0, 101, True, 1.5]:
            with self.assertRaises(ValueError):
                PracticeSession.create("B", attempts)


if __name__ == "__main__":
    unittest.main()
