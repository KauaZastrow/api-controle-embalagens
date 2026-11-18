DROP DATABASE IF EXISTS banco;
CREATE DATABASE banco;

USE banco;

CREATE TABLE embalagem (
    id_ensaio INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(200) NOT NULL,
    material VARCHAR(100) NOT NULL,
    capacidade decimal(10,6) NOT NULL
);

CREATE TABLE maquina (
    id_equipamento INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    patrimonio VARCHAR(100) NOT NULL,
    status_maquina VARCHAR(50) NOT NULL
);

CREATE TABLE operador (
    id_analista INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    matricula VARCHAR(100) NOT NULL,
    turno VARCHAR(100) NOT NULL
);