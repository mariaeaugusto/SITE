
const express = require('express');

const app = express();
const PORT = 3000;

// Permite receber dados em JSON
app.use(express.json());

// Importa as rotas
const clientesRoutes = require('../routes/clientes');
const tecnicosRoutes = require('../routes/tecnicos');
const ordensRoutes = require('../routes/ordens');

// Registra as rotas da API
app.use('/clientes', clientesRoutes);
app.use('/tecnicos', tecnicosRoutes);
app.use('/ordens-servico', ordensRoutes);

// Rota inicial
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API do Sistema de Ordem de Serviço funcionando!'
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
