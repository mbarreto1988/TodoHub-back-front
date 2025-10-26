create database TodoHub;

use TodoHub;

CREATE TABLE Users (
    Id INT IDENTITY(1,1) NOT NULL,
    Username NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL,
	PRIMARY KEY(Id)
);

CREATE TABLE Tasks (
    Id INT IDENTITY(1,1) NOT NULL,
    UserId INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    IsCompleted BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL,
	PRIMARY KEY(Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

INSERT INTO Users (Username, Email, PasswordHash)
VALUES ('mati', 'mati@example.com', '$2b$10$2bHASHFALSO1234567890qwertyuiop'),
('gonzalo', 'gonzalo@example.com', '$2b$10$2bHASHFALSO2234567890qwertyuiop'),
('laura', 'laura@example.com', '$2b$10$2bHASHFALSO3234567890qwertyuiop');

INSERT INTO Tasks (UserId, Title, Description, IsCompleted)
VALUES (1, 'Armar backend NodeJS', 'Estructura clean architecture con SQL Server', 0),
(1, 'Configurar JWT', 'Agregar expiraci�n de 30 horas', 0),
(2, 'Dise�ar frontend', 'Pantalla de login y tareas', 1);


SELECT * FROM Users;
SELECT * FROM Tasks;