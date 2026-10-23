from .api import create_app
from .application import TrainingService
from .database import create_database_engine
from .repository import SQLServerExperimentRepository

app = create_app(
    TrainingService(SQLServerExperimentRepository(create_database_engine()))
)
