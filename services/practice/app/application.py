from dataclasses import asdict
from .domain import PracticeRepository, PracticeSession


class PracticeService:
    def __init__(self, repository: PracticeRepository):
        self.repository = repository

    def list_letters(self) -> dict:
        return {"items": self.repository.list_letters()}

    def create_session(self, letter: str, attempts: int) -> dict:
        session = PracticeSession.create(letter, attempts)
        self.repository.save(session)
        return asdict(session)

    def check(self) -> None:
        self.repository.check()
