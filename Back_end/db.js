const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para criar/aceder à base de dados na pasta banco_dados
const dbPath = path.resolve(__dirname, '../banco_dados/sistema.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao ligar à base de dados SQLite:', err.message);
    } else {
        console.log('Base de dados SQLite ligada com sucesso!');
    }
});              

module.exports = db;