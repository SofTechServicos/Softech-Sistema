document.addEventListener('DOMContentLoaded', () => {
  const orcamentos = JSON.parse(localStorage.getItem('orcamentosSalvos') || '[]');

  // Gráfico de Orçamentos
  const totalOrcamentos = orcamentos.length;
  const totalValores = orcamentos.reduce((acc, orcamento) => {
    const total = parseFloat(orcamento.totalFinal.replace('R$ ', '').replace(',', '.')) || 0;
    return acc + total;
  }, 0);

  const orcamentosCtx = document.getElementById('orcamentosChart').getContext('2d');
  new Chart(orcamentosCtx, {
    type: 'doughnut',
    data: {
      labels: ['Orçamentos Salvos', 'Valor Total Gerado (R$)'],
      datasets: [{
        data: [totalOrcamentos, totalValores.toFixed(2)],
        backgroundColor: ['#1a73e8', '#28a745'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Orçamentos Salvos e Valor Total' }
      }
    }
  });

  // Gráfico de Serviços
  const servicos = {};
  orcamentos.forEach(orcamento => {
    orcamento.linhas.forEach(linha => {
      servicos[linha.servico] = (servicos[linha.servico] || 0) + parseInt(linha.quantidade, 10);
    });
  });

  const servicosLabels = Object.keys(servicos);
  const servicosData = Object.values(servicos);

  const servicosCtx = document.getElementById('servicosChart').getContext('2d');
  new Chart(servicosCtx, {
    type: 'bar',
    data: {
      labels: servicosLabels,
      datasets: [{
        label: 'Quantidade de Serviços',
        data: servicosData,
        backgroundColor: '#1a73e8',
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Serviços Mais Utilizados' }
      },
      scales: { y: { beginAtZero: true } }
    }
  });

  // Gráfico de Clientes
  const clientes = orcamentos.map(orcamento => orcamento.cliente || 'Não informado');
  const clientesUnicos = [...new Set(clientes)];
  const clientesData = clientesUnicos.map(cliente => clientes.filter(c => c === cliente).length);

  const clientesCtx = document.getElementById('clientesChart').getContext('2d');
  new Chart(clientesCtx, {
    type: 'pie',
    data: {
      labels: clientesUnicos,
      datasets: [{
        data: clientesData,
        backgroundColor: ['#1a73e8', '#28a745', '#ffc107', '#dc3545'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Distribuição de Clientes' }
      }
    }
  });

  // Gráfico de Valores Gerados
  const valoresCtx = document.getElementById('valoresChart').getContext('2d');
  new Chart(valoresCtx, {
    type: 'line',
    data: {
      labels: orcamentos.map((_, index) => `Orçamento ${index + 1}`),
      datasets: [{
        label: 'Valores Gerados (R$)',
        data: orcamentos.map(orcamento => parseFloat(orcamento.totalFinal.replace('R$ ', '').replace(',', '.')) || 0),
        borderColor: '#1a73e8',
        backgroundColor: 'rgba(26, 115, 232, 0.2)',
        fill: true,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Valores Gerados por Orçamento' }
      },
      scales: { y: { beginAtZero: true } }
    }
  });
});