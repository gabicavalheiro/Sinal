import os
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine, URL


def create_database_engine() -> Engine:
    return create_engine(
        URL.create(
            "mssql+pymssql",
            username=os.environ["SQLSERVER_USER"],
            password=os.environ["SQLSERVER_PASSWORD"],
            host=os.getenv("SQLSERVER_HOST", "sqlserver"),
            port=1433,
            database=os.getenv("SQLSERVER_DATABASE", "sinal_training"),
        ),
        pool_pre_ping=True,
        connect_args={"login_timeout": 5},
    )
