from dataclasses import dataclass
from typing import Protocol
from uuid import uuid4

SUPPORTED_LETTERS = frozenset("ABCD")


@dataclass(frozen=True)
class PracticeSession:
    id: str
    letter: str
    attempts: int
    evaluation: str = "manual"

    @classmethod
    def create(cls, letter: str, attempts: int = 1) -> "PracticeSession":
        if letter not in SUPPORTED_LETTERS:
            raise ValueError("Letra não disponível nesta etapa.")
        if (
            isinstance(attempts, bool)
            or not isinstance(attempts, int)
            or not 1 <= attempts <= 100
        ):
            raise ValueError("As tentativas devem estar entre 1 e 100.")
        return cls(str(uuid4()), letter, attempts)


class RepositoryUnavailable(RuntimeError):
    pass


class PracticeRepository(Protocol):
    def save(self, session: PracticeSession) -> None: ...
    def list_letters(self) -> list[dict]: ...
    def check(self) -> None: ...
