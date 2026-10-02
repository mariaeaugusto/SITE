// Dados Iniciais com Relato de Problemas
let equipamentos = [
  { 
    id: "OS-1001", 
    nome: "Notebook Lenovo ThinkPad", 
    cliente: "Ana Silva", 
    problema: "Tela piscando e aquecimento excessivo após 20 minutos de uso.",
    status: "Em atendimento" 
  },
  { 
    id: "OS-1002", 
    nome: "Servidor Dell PowerEdge", 
    cliente: "Empresa Alfa", 
    problema: "Fonte queimada e HD de backup apresentando ruídos metálicos.",
    status: "Em espera" 
  },
  { 
    id: "OS-1003", 
    nome: "MacBook Pro 16", 
    cliente: "Carlos Souza", 
    problema: "Troca de bateria e limpeza interna preventiva.",
    status: "Concluído" 
  },
  { 
    id: "OS-1004", 
    nome: "Tablet Samsung Tab S8", 
    cliente: "Mariana Costa", 
    problema: "Vidro frontal trincado e conector de carga frouxo.",
    status: "Cancelado" 
  }
];

// Evento de Submit do Formulário de Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboardScreen').style.display = 'flex';
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
  const problema = document.getElementById('problema').value;
  const novoId = "OS-" + Math.floor(1000 + Math.random() * 9000);

  // Adiciona o novo item com a descrição do problema
  equipamentos.unshift({ 
    id: novoId, 
    nome: nome, 
    cliente: cliente, 
    problema: problema,
    status: status 
  });

  this.reset();
  renderizarTabela();
});

// Renderizar Tabela e Contadores
function renderizarTabela() {
  const tbody = document.getElementById('equipmentTableBody');
  tbody.innerHTML = '';

  let cConcluido = 0, cEspera = 0, cAtendimento = 0, cCancelado = 0;

  equipamentos.forEach(item => {
    let badgeClass = '';
    
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

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.id}</strong></td>
      <td>${item.nome}</td>
      <td>${item.cliente}</td>
      <td class="problem-text">${item.problema}</td>
      <td><span class="badge ${badgeClass}">${item.status}</span></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('countConcluido').innerText = cConcluido;
  document.getElementById('countEspera').innerText = cEspera;
  document.getElementById('countAtendimento').innerText = cAtendimento;
  document.getElementById('countCancelado').innerText = cCancelado;
}