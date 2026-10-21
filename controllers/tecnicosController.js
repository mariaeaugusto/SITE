
let tecnicos = [];
let proximoId = 1;

// Listar técnicos
exports.listarTecnicos = (req, res) => {
    res.json(tecnicos);
};

// Buscar técnico por ID
exports.buscarTecnico = (req, res) => {
    const tecnico = tecnicos.find(
        t => t.id === Number(req.params.id)
    );

    if (!tecnico) {
        return res.status(404).json({
            erro: 'Técnico não encontrado'
        });
    }

    res.json(tecnico);
};

// Cadastrar técnico
exports.criarTecnico = (req, res) => {
    const { nome, telefone, especialidade } = req.body;

    if (!nome || !telefone || !especialidade) {
        return res.status(400).json({
            erro: 'Preencha nome, telefone e especialidade'
        });
    }

    const novoTecnico = {
        id: proximoId++,
        nome,
        telefone,
        especialidade
    };

    tecnicos.push(novoTecnico);

    res.status(201).json(novoTecnico);
};

// Atualizar técnico
exports.atualizarTecnico = (req, res) => {
    const tecnico = tecnicos.find(
        t => t.id === Number(req.params.id)
    );

    if (!tecnico) {
        return res.status(404).json({
            erro: 'Técnico não encontrado'
        });
    }

    Object.assign(tecnico, req.body, { id: tecnico.id });

    res.json(tecnico);
};

// Excluir técnico
exports.excluirTecnico = (req, res) => {
    const indice = tecnicos.findIndex(
        t => t.id === Number(req.params.id)
    );

    if (indice === -1) {
        return res.status(404).json({
            erro: 'Técnico não encontrado'
        });
    }

    tecnicos.splice(indice, 1);

    res.json({ mensagem: 'Técnico excluído com sucesso' });
};
