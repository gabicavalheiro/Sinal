from .api import create_app
from .application import PracticeService
from .database import create_database_engine
from .repository import MySQLPracticeRepository

app = create_app(PracticeService(MySQLPracticeRepository(create_database_engine())))
