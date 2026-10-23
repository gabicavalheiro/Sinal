from contextlib import contextmanager
from sqlalchemy.exc import SQLAlchemyError
from dataclasses import asdict
from sqlalchemy import Engine, text
from .domain import PracticeSession, RepositoryUnavailable


class MySQLPracticeRepository:
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
            connection.execute(text("SELECT 1 FROM practice_letters LIMIT 1"))

    def save(self, session: PracticeSession) -> None:
        with self._transaction() as connection:
            connection.execute(
                text(
                    "INSERT INTO practice_sessions (id, letter, attempts, evaluation) "
                    "VALUES (:id, :letter, :attempts, :evaluation)"
                ),
                asdict(session),
            )

    def list_letters(self) -> list[dict]:
        with self._transaction() as connection:
            return [
                dict(row)
                for row in connection.execute(
                    text(
                        "SELECT letter, instruction FROM practice_letters ORDER BY letter"
                    )
                ).mappings()
            ]
