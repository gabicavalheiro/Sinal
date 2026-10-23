from uuid import UUID
from fastapi import FastAPI, HTTPException
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from .application import TrainingService
from .contracts import RepositoryUnavailable


class ExperimentInput(BaseModel):
    dataset_csv: str = Field(min_length=1, max_length=2_000_000)
    seed: int = Field(default=42, ge=0, le=2**32 - 1, strict=True)


def create_app(service: TrainingService) -> FastAPI:
    app = FastAPI(title="Sinal · Serviço de treinamento", version="0.1.0")

    @app.exception_handler(RepositoryUnavailable)
    async def unavailable_handler(_request, _error):
        return JSONResponse(
            status_code=503,
            content={"detail": "Banco de experimentos temporariamente indisponível."},
        )

    @app.get("/health")
    def health():
        return {"status": "ok", "service": "training", "version": "0.1.0"}

    @app.get("/ready")
    def ready():
        service.check()
        return {"status": "ready"}

    @app.post("/v1/experiments", status_code=201)
    async def create_experiment(data: ExperimentInput):
        try:
            return await run_in_threadpool(
                service.create_experiment, data.dataset_csv, data.seed
            )
        except ValueError as error:
            raise HTTPException(422, str(error)) from None

    @app.get("/v1/experiments/{experiment_id}")
    def get_experiment(experiment_id: UUID):
        result = service.get_experiment(str(experiment_id))
        if result is None:
            raise HTTPException(404, "Experimento não encontrado.")
        return result

    return app
