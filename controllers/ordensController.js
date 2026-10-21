
let ordens = [];
let proximoId = 1;

// Listar todas as ordens
exports.listarOrdens = (req, res) => {
    res.json(ordens);
};

// Consultar uma ordem pelo ID
exports.buscarOrdem = (req, res) => {
    const ordem = ordens.find(
        o => o.id === Number(req.params.id)
    );

    if (!ordem) {
        return res.status(404).json({
            erro: 'Ordem de serviço não encontrada'
        });
    }

    res.json(ordem);
};

// Cadastrar uma ordem
exports.criarOrdem = (req, res) => {
    const { cliente, equipamento, descricao } = req.body;

    if (!cliente || !equipamento || !descricao) {
        return res.status(400).json({
            erro: 'Preencha cliente, equipamento e descrição'
        });
    }

    const novaOrdem = {
        id: proximoId++,
        cliente,
        equipamento,
        descricao,
        status: 'Aberta'
    };

    ordens.push(novaOrdem);

    res.status(201).json(novaOrdem);
};

// Atualizar uma ordem
exports.atualizarOrdem = (req, res) => {
    const ordem = ordens.find(
        o => o.id === Number(req.params.id)
    );

    if (!ordem) {
        return res.status(404).json({
            erro: 'Ordem não encontrada'
        });
    }

    Object.assign(ordem, req.body, { id: ordem.id });

    res.json(ordem);
};

// Excluir uma ordem
exports.excluirOrdem = (req, res) => {
    const indice = ordens.findIndex(
        o => o.id === Number(req.params.id)
    );

    if (indice === -1) {
        return res.status(404).json({
            erro: 'Ordem não encontrada'
        });
    }

    ordens.splice(indice, 1);

    res.json({ mensagem: 'Ordem excluída com sucesso' });
};
