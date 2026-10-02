// Dados Iniciais de Exemplo
let equipamentos = [
  { id: "OS-1001", nome: "Notebook Lenovo ThinkPad", cliente: "Ana Silva", status: "Em atendimento" },
  { id: "OS-1002", nome: "Servidor Dell PowerEdge", cliente: "Empresa Alfa", status: "Em espera" },
  { id: "OS-1003", nome: "MacBook Pro 16", cliente: "Carlos Souza", status: "Concluído" },
  { id: "OS-1004", nome: "Tablet Samsung Tab S8", cliente: "Mariana Costa", status: "Cancelado" }
];

// Evento de Submit do Formulário de Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Esconde a tela de login e exibe a tela principal
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboardScreen').style.display = 'flex';
  
  // Renderiza os dados na tabela
  renderizarTabela();
});

// Função de Logout
function fazerLogout() {
  document.getElementById('dashboardScreen').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
}

// Cadastro de Novo Equipamento
document.getElementById('addEquipmentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nome = document.getElementById('equipamento').value;
  const cliente = document.getElementById('cliente').value;
  const status = document.getElementById('status').value;
  const novoId = "OS-" + Math.floor(1000 + Math.random() * 9000);

  // Adiciona o novo item no início da lista
  equipamentos.unshift({ id: novoId, nome: nome, cliente: cliente, status: status });

  // Limpa o formulário e atualiza a interface
  this.reset();
  renderizarTabela();
});

// Função para Atualizar Tabela e Contadores
function renderizarTabela() {
  const tbody = document.getElementById('equipmentTableBody');
  tbody.innerHTML = '';

  let cConcluido = 0, cEspera = 0, cAtendimento = 0, cCancelado = 0;

  equipamentos.forEach(item => {
    let badgeClass = '';
    
    // Define a cor de acordo com o status
    if (item.status === 'Concluído') {
      badgeClass = 'badge-concluido';
      cConcluido++;
    } else if (item.status === 'Em espera') {
      badgeClass = 'badge-espera';
      cEspera++;
    } else if (item.status === 'Em atendimento') {
      badgeClass = 'badge-atendimento';
      cAtendimento++;
    } else if (item.status === 'Cancelado') {
      badgeClass = 'badge-cancelado';
      cCancelado++;
    }

    // Cria a linha da tabela
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.id}</strong></td>
      <td>${item.nome}</td>
      <td>${item.cliente}</td>
      <td><span class="badge ${badgeClass}">${item.status}</span></td>
    `;
    tbody.appendChild(tr);
  });

  // Atualiza os valores nos cards de resumo
  document.getElementById('countConcluido').innerText = cConcluido;
  document.getElementById('countEspera').innerText = cEspera;
  document.getElementById('countAtendimento').innerText = cAtendimento;
  document.getElementById('countCancelado').innerText = cCancelado;
}