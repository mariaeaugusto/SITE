// Base de dados simulando clientes cadastrados no sistema
let clientesCadastrados = [
  {
    email: "ana@email.com",
    nome: "Ana Silva",
    equipamentos: [
      { id: "OS-1001", nome: "Notebook Lenovo ThinkPad", problema: "Tela piscando e aquecimento excessivo.", status: "Em atendimento" },
      { id: "OS-1005", nome: "Impressora HP LaserJet", problema: "Atolando papel na bandeja principal.", status: "Concluído" }
    ]
  },
  {
    email: "carlos@email.com",
    nome: "Carlos Souza",
    equipamentos: [
      { id: "OS-1002", nome: "MacBook Pro 16", problema: "Troca de bateria e limpeza preventiva.", status: "Concluído" }
    ]
  },
  {
    email: "mariana@email.com",
    nome: "Mariana Costa",
    equipamentos: [
      { id: "OS-1003", nome: "Tablet Samsung Tab S8", problema: "Vidro frontal trincado e conector frouxo.", status: "Em espera" }
    ]
  }
];

let clienteLogado = null;

// Alternar entre Abas "Sou Cliente" e "Sou Técnico"
function alternarAba(tipo) {
  const tabClient = document.getElementById('tabClientBtn');
  const tabTech = document.getElementById('tabTechBtn');
  const formClient = document.getElementById('clientLoginForm');
  const formTech = document.getElementById('techLoginForm');

  if (tipo === 'cliente') {
    tabClient.classList.add('active');
    tabTech.classList.remove('active');
    formClient.style.display = 'block';
    formTech.style.display = 'none';
  } else {
    tabTech.classList.add('active');
    tabClient.classList.remove('active');
    formTech.style.display = 'block';
    formClient.style.display = 'none';
  }
}

// LOGIN DO CLIENTE JÁ CADASTRADO
document.getElementById('clientLoginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const busca = document.getElementById('cEmail').value.trim().toLowerCase();

  // Procura cliente pelo e-mail ou código OS
  clienteLogado = clientesCadastrados.find(c => 
    c.email.toLowerCase() === busca || 
    c.equipamentos.some(eq => eq.id.toLowerCase() === busca)
  );

  if (!clienteLogado) {
    // Se não encontrar, cria um perfil dinâmico para demonstração
    clienteLogado = {
      email: busca,
      nome: "Cliente Cadastrado",
      equipamentos: [
        { id: "OS-9901", nome: "Equipamento em Diagnóstico", problema: "Aguardando avaliação do técnico.", status: "Em espera" }
      ]
    };
    clientesCadastrados.push(clienteLogado);
  }

  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('clientDashboard').style.display = 'flex';
  
  document.getElementById('clientWelcome').innerText = `Olá, ${clienteLogado.nome}`;
  renderizarTabelaCliente();
});

// LOGIN DO TÉCNICO
document.getElementById('techLoginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('techDashboard').style.display = 'flex';
  renderizarTabelaTecnico();
});

// LOGOUT
function fazerLogout() {
  clienteLogado = null;
  document.getElementById('clientDashboard').style.display = 'none';
  document.getElementById('techDashboard').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
}

// CLIENTE ADICIONA NOVO EQUIPAMENTO/PROBLEMA
document.getElementById('clientNewRequestForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nomeEquipamento = document.getElementById('eqNome').value;
  const problema = document.getElementById('eqProblema').value;
  const novoId = "OS-" + Math.floor(1000 + Math.random() * 9000);

  clienteLogado.equipamentos.unshift({
    id: novoId,
    nome: nomeEquipamento,
    problema: problema,
    status: "Em espera"
  });

  this.reset();
  renderizarTabelaCliente();
  alert(`Solicitação enviada com sucesso! Código da OS: ${novoId}`);
});

// RENDERIZAR TABELA DO CLIENTE
function renderizarTabelaCliente() {
  const tbody = document.getElementById('clientTableBody');
  tbody.innerHTML = '';

  clienteLogado.equipamentos.forEach(item => {
    const badgeClass = getBadgeClass(item.status);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.id}</strong></td>
      <td>${item.nome}</td>
      <td class="problem-text">${item.problema}</td>
      <td><span class="badge ${badgeClass}">${item.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// RENDERIZAR TABELA DO TÉCNICO (TODOS OS CLIENTES)
function renderizarTabelaTecnico() {
  const tbody = document.getElementById('techTableBody');
  tbody.innerHTML = '';

  let cConcluido = 0, cEspera = 0, cAtendimento = 0, cCancelado = 0;

  clientesCadastrados.forEach(cliente => {
    cliente.equipamentos.forEach((item) => {
      if (item.status === 'Concluído') cConcluido++;
      else if (item.status === 'Em espera') cEspera++;
      else if (item.status === 'Em atendimento') cAtendimento++;
      else if (item.status === 'Cancelado') cCancelado++;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${item.id}</strong></td>
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td>${item.nome}</td>
        <td class="problem-text">${item.problema}</td>
        <td>
          <select class="select-status-table" onchange="alterarStatus('${item.id}', this.value)">
            <option value="Em espera" ${item.status === 'Em espera' ? 'selected' : ''}>🟠 Em espera</option>
            <option value="Em atendimento" ${item.status === 'Em atendimento' ? 'selected' : ''}>🔵 Em atendimento</option>
            <option value="Concluído" ${item.status === 'Concluído' ? 'selected' : ''}>🟢 Concluído</option>
            <option value="Cancelado" ${item.status === 'Cancelado' ? 'selected' : ''}>🔴 Cancelado</option>
          </select>
        </td>
      `;
      tbody.appendChild(tr);
    });
  });

  document.getElementById('countConcluido').innerText = cConcluido;
  document.getElementById('countEspera').innerText = cEspera;
  document.getElementById('countAtendimento').innerText = cAtendimento;
  document.getElementById('countCancelado').innerText = cCancelado;
}

// TÉCNICO ALTERA O STATUS DO EQUIPAMENTO DE UM CLIENTE
function alterarStatus(osId, novoStatus) {
  clientesCadastrados.forEach(cliente => {
    const eq = cliente.equipamentos.find(e => e.id === osId);
    if (eq) {
      eq.status = novoStatus;
    }
  });
  renderizarTabelaTecnico();
}

function getBadgeClass(status) {
  if (status === 'Concluído') return 'badge-concluido';
  if (status === 'Em espera') return 'badge-espera';
  if (status === 'Em atendimento') return 'badge-atendimento';
  if (status === 'Cancelado') return 'badge-cancelado';
  return '';
}