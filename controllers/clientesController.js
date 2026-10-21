
let clientes = [];
let proximoId = 1;

// Listar clientes
exports.listarClientes = (req, res) => {
    res.json(clientes);
};

// Buscar cliente por ID
exports.buscarCliente = (req, res) => {
    const cliente = clientes.find(
        c => c.id === Number(req.params.id)
    );

    if (!cliente) {
        return res.status(404).json({
            erro: 'Cliente não encontrado'
        });
    }

    res.json(cliente);
};

// Cadastrar cliente
exports.criarCliente = (req, res) => {
    const { nome, telefone, email } = req.body;

    if (!nome || !telefone || !email) {
        return res.status(400).json({
            erro: 'Preencha nome, telefone e email'
        });
    }

    const novoCliente = {
        id: proximoId++,
        nome,
        telefone,
        email
    };

    clientes.push(novoCliente);

    res.status(201).json(novoCliente);
};

// Atualizar cliente
exports.atualizarCliente = (req, res) => {
    const cliente = clientes.find(
        c => c.id === Number(req.params.id)
    );

    if (!cliente) {
        return res.status(404).json({
            erro: 'Cliente não encontrado'
        });
    }

    Object.assign(cliente, req.body, { id: cliente.id });

    res.json(cliente);
};

// Excluir cliente
exports.excluirCliente = (req, res) => {
    const indice = clientes.findIndex(
        c => c.id === Number(req.params.id)
    );

    if (indice === -1) {
        return res.status(404).json({
            erro: 'Cliente não encontrado'
        });
    }

    clientes.splice(indice, 1);

    res.json({ mensagem: 'Cliente excluído com sucesso' });
};
