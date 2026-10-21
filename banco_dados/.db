-- database: server.db

CREATE TABLE clientes (
     id_cliente INT AUTO_INCREMENT PRIMARY KEY,
     nome VARCHAR(100) NOT NULL,
     telefone VARCHAR(20),
     email VARCHAR(100)
);

CREATE TABLE tecnicos (
     id_tecnico INT AUTO_INCREMENT PRIMARY KEY,
     nome VARCHAR(100) NOT NULL,
     especialidade VARCHAR(100)
);

CREATE TABLE equipamentos (
     id_equipamento INT AUTO_INCREMENT PRIMARY KEY,
     nome VARCHAR(100) NOT NULL,
     marca VARCHAR(50),
     modelo VARCHAR(50),
     id_cliente INT,
     FOREIGN KEY (id_cliente)
     REFERENCES clientes(id_cliente)
);

CREATE TABLE ordens_servico (
     id_ordem INT AUTO_INCREMENT PRIMARY KEY,
     descricao TEXT NOT NULL,
     status VARCHAR(30) DEFAULT 'Pendente',
     data_abertura DATE NOT NULL,
     id_cliente INT NOT NULL,
     id_tecnico INT,
     id_equipamento INT,
     FOREIGN KEY (id_cliente)
     REFERENCES clientes(id_cliente),
     FOREIGN KEY (id_tecnico)
     REFERENCES tecnicos(id_tecnico),
     FOREIGN KEY (id_equipamento)
     REFERENCES equipamentos(id_equipamento)
);
