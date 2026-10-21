
const express = require('express');
const router = express.Router();

// Listar técnicos
router.get('/', (req, res) => {
    res.json({
        mensagem: 'Lista de técnicos',
        tecnicos: []
    });
});

// Consultar um técnico pelo ID
router.get('/:id', (req, res) => {
    res.json({
        mensagem: 'Consultar técnico',
        id: req.params.id
    });
});

// Cadastrar técnico
router.post('/', (req, res) => {
    res.status(201).json({
        mensagem: 'Técnico cadastrado com sucesso!',
        tecnico: req.body
    });
});

// Atualizar técnico
router.put('/:id', (req, res) => {
    res.json({
        mensagem: 'Técnico atualizado com sucesso!',
        id: req.params.id,
        dados: req.body
    });
});

// Excluir técnico
router.delete('/:id', (req, res) => {
    res.json({
        mensagem: 'Técnico excluído com sucesso!',
        id: req.params.id
    });
});

module.exports = router;
