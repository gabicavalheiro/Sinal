IF DB_ID('sinal_training') IS NULL
    CREATE DATABASE sinal_training;
GO
USE sinal_training;
GO
IF OBJECT_ID('dataset_versions', 'U') IS NULL
CREATE TABLE dataset_versions (
    sha256 CHAR(64) PRIMARY KEY,
    row_count INT NOT NULL CHECK (row_count > 0),
    participant_count INT NOT NULL CHECK (participant_count >= 3),
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO
IF OBJECT_ID('experiments', 'U') IS NULL
CREATE TABLE experiments (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    dataset_sha256 CHAR(64) NOT NULL REFERENCES dataset_versions(sha256),
    model_json NVARCHAR(MAX) NOT NULL CHECK (ISJSON(model_json) = 1),
    metrics_json NVARCHAR(MAX) NOT NULL CHECK (ISJSON(metrics_json) = 1),
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO
IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = 'sinal_training_app')
BEGIN
    CREATE USER sinal_training_app FOR LOGIN sinal_training_app;
    ALTER ROLE db_datareader ADD MEMBER sinal_training_app;
    ALTER ROLE db_datawriter ADD MEMBER sinal_training_app;
END;
GO
