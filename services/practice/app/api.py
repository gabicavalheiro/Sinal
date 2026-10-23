from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from .application import PracticeService
from .domain import RepositoryUnavailable


class SessionInput(BaseModel):
    letter: str = Field(pattern="^[A-D]$")
    attempts: int = Field(default=1, ge=1, le=100, strict=True)


def create_app(service: PracticeService) -> FastAPI:
    app = FastAPI(title="Sinal · Serviço de prática", version="0.1.0")

    @app.exception_handler(RepositoryUnavailable)
    async def unavailable_handler(_request, _error):
        return JSONResponse(
            status_code=503,
            content={"detail": "Banco de prática temporariamente indisponível."},
        )

    @app.get("/health")
    def health():
        return {"status": "ok", "service": "practice", "version": "0.1.0"}

    @app.get("/ready")
    def ready():
        service.check()
        return {"status": "ready"}

    @app.get("/v1/letters")
    def list_letters():
        return service.list_letters()

    @app.post("/v1/sessions", status_code=201)
    def save_session(data: SessionInput):
        return service.create_session(data.letter, data.attempts)

    return app
