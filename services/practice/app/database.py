import os
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine, URL


def create_database_engine() -> Engine:
    return create_engine(
        URL.create(
            "mysql+pymysql",
            username=os.environ["MYSQL_USER"],
            password=os.environ["MYSQL_PASSWORD"],
            host=os.getenv("MYSQL_HOST", "mysql"),
            port=3306,
            database=os.getenv("MYSQL_DATABASE", "sinal_practice"),
        ),
        pool_pre_ping=True,
        connect_args={"connect_timeout": 5},
    )
