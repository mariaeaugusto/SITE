const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o banco de dados SQLite
const dbPath = path.resolve(__dirname, '../banco_dados/server.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err.message);
    } else {
        console.log('Banco de dados SQLite conectado com sucesso!');
    }
});

// Ativar as chaves estrangeiras
db.run('PRAGMA foreign_keys = ON');

module.exports = db;