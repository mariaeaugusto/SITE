-- database: server.db

PRAGMA foreign_keys = ON;

CREATE TABLE usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('cliente', 'tecnico', 'administrador'))
);

CREATE TABLE clientes (
    id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
    telefone VARCHAR(20),
    endereco VARCHAR(150),
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE tecnicos (
    id_tecnico INTEGER PRIMARY KEY AUTOINCREMENT,
    especialidade VARCHAR(100),
    telefone VARCHAR(20),
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE status (
    id_status INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE equipamentos (
    id_equipamento INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    id_cliente INTEGER,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

CREATE TABLE ordens_servico (
    id_ordem INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL,
    id_status INTEGER NOT NULL DEFAULT 1,
    data_abertura DATE NOT NULL,
    id_cliente INTEGER NOT NULL,
    id_tecnico INTEGER,
    id_equipamento INTEGER,
    FOREIGN KEY (id_status) REFERENCES status(id_status),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_tecnico) REFERENCES tecnicos(id_tecnico),
    FOREIGN KEY (id_equipamento) REFERENCES equipamentos(id_equipamento)
);

-- ========== DADOS ==========

INSERT INTO status (nome) VALUES
('Pendente'),
('Em andamento'),
('Concluída'),
('Cancelada');

INSERT INTO usuario (nome, email, senha, tipo) VALUES
('Ana Silva', 'ana@email.com', 'senha123', 'cliente'),
('Carlos Souza', 'carlos@email.com', 'senha456', 'tecnico');

INSERT INTO clientes (telefone, endereco, id_usuario) VALUES
('(11) 99999-1111', 'Rua das Flores, 100', 1);

INSERT INTO tecnicos (especialidade, telefone, id_usuario) VALUES
('Manutenção de computadores', '(11) 98888-2222', 2);

INSERT INTO equipamentos (nome, marca, modelo, id_cliente) VALUES
('Notebook', 'Dell', 'Inspiron 15', 1);

INSERT INTO ordens_servico (descricao, id_status, data_abertura, id_cliente, id_tecnico, id_equipamento) VALUES
('Notebook não liga', 1, '2026-10-23', 1, 1, 1);