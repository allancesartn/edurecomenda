
-- Criação do banco de dados
CREATE DATABASE edurecomenda;

USE edurecomenda;

CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    avaliacao FLOAT NOT NULL,
    acessos INT NOT NULL,
    tempo INT NOT NULL,
    area VARCHAR(100) NOT NULL,
    nivel VARCHAR(100) NOT NULL
);

