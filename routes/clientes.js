
const express = require('express');
const router = express.Router();

// Listar clientes
router.get('/', (req, res) => {
    res.json({
        mensagem: 'Lista de clientes',
        clientes: []
    });
});

// Consultar um cliente pelo ID
router.get('/:id', (req, res) => {
    res.json({
        mensagem: 'Consultar cliente',
        id: req.params.id
    });
});

// Cadastrar cliente
router.post('/', (req, res) => {
    res.status(201).json({
        mensagem: 'Cliente cadastrado com sucesso!',
        cliente: req.body
    });
});

// Atualizar cliente
router.put('/:id', (req, res) => {
    res.json({
        mensagem: 'Cliente atualizado com sucesso!',
        id: req.params.id,
        dados: req.body
    });
});

// Excluir cliente
router.delete('/:id', (req, res) => {
    res.json({
        mensagem: 'Cliente excluído com sucesso!',
        id: req.params.id
    });
});

module.exports = router;
