// Valores padrão para cópias
const VALOR_PRETO = 1.00;
const VALOR_COLORIDA = 2.00;
const LOCAL_STORAGE_KEY = 'orcamentosSalvos';

const valoresServico = {
  "Impressão Simples (Preto e Branco – por página)": { valor: 1.00 },
  "Impressão Simples (Colorida – por página)": { valor: 2.00 },
  "Digitalização de documentos (por página)": { valor: 1.00 },
  "Plastificação de documentos A4": { valor: 3.00 },
  "Plastificação de documentos menores que A4": { valor: 2.00 },
  "Corte com guilhotina (até 20 folhas)": { valor: 2.00 },
  "Impressão de boletos/documentos oficiais": { valor: 5.00 }
};

function popularSelectServico(selectElement) {
  selectElement.innerHTML = '<option value="">Selecione</option>';
  Object.entries(valoresServico).forEach(([servico, detalhes]) => {
    const opt = document.createElement('option');
    opt.value = servico;
    opt.textContent = servico;
    opt.dataset.valorUnitario = detalhes.valor || 0; // Adiciona o valor unitário como atributo
    selectElement.appendChild(opt);
  });
}

function setupRowEventListeners(serviceRow) {
  const select = serviceRow.querySelector('.servico-select');
  const quantidadeInput = serviceRow.querySelector('.quantidade');
  const valorUnitarioInput = serviceRow.querySelector('.valor-unitario');
  const removerBtn = serviceRow.querySelector('.remover-linha-btn');

  if (!select || !quantidadeInput || !valorUnitarioInput || !removerBtn) {
    console.error("Um ou mais elementos essenciais não encontrados na linha de serviço:", {
      row: serviceRow,
      selectFound: !!select,
      qtyFound: !!quantidadeInput,
      valFound: !!valorUnitarioInput,
      btnFound: !!removerBtn
    });
    return;
  }

  popularSelectServico(select); // Popula o select desta linha

  select.addEventListener('change', function () {
    atualizarValorUnitario(this);
  });

  quantidadeInput.addEventListener('input', function () {
    calcularTotalServico(serviceRow);
  });

  quantidadeInput.addEventListener('focus', function () {
    this.select(); // Seleciona o conteúdo ao focar
  });

  removerBtn.addEventListener('click', function () {
    removerLinha(this);
  });
}

function atualizarValorUnitario(selectElement) {
  const serviceRow = selectElement.closest('tr');
  const valorUnitarioInput = serviceRow.querySelector('.valor-unitario');
  const servicoSelecionado = selectElement.value;

  if (!servicoSelecionado) {
    valorUnitarioInput.value = "0.00";
  } else {
    const precoBase = valoresServico[servicoSelecionado]?.valor;
    valorUnitarioInput.value = precoBase ? precoBase.toFixed(2) : "0.00";
  }
  calcularTotalServico(serviceRow);
}

function calcularTotalServico(serviceRowElement) {
  if (!serviceRowElement) {
    console.error("Linha de serviço (serviceRowElement) não fornecida para calcularTotalServico.");
    return;
  }

  const valorUnitarioInput = serviceRowElement.querySelector('.valor-unitario');
  const quantidadeInput = serviceRowElement.querySelector('.quantidade');
  const totalServicoTd = serviceRowElement.querySelector('.total-servico');

  if (!valorUnitarioInput || !quantidadeInput || !totalServicoTd) {
    console.error("Elementos faltando na linha de serviço para cálculo:", {
      row: serviceRowElement,
      valorUnitarioInputFound: !!valorUnitarioInput,
      quantidadeInputFound: !!quantidadeInput,
      totalServicoTdFound: !!totalServicoTd
    });
    return;
  }

  const valorUnitario = parseFloat(valorUnitarioInput.value) || 0;
  const quantidade = parseInt(quantidadeInput.value) || 0;
  let total = valorUnitario * quantidade;

  // Aplicar desconto progressivo
  let desconto = 0;
  if (quantidade > 200) {
    desconto = 0.15; // 15% de desconto
  } else if (quantidade > 100) {
    desconto = 0.10; // 10% de desconto
  } else if (quantidade > 50) {
    desconto = 0.05; // 5% de desconto
  }
  total = total * (1 - desconto);

  totalServicoTd.textContent = total.toFixed(2); // Exibe o total formatado
  calcularValorFinal(); // Atualiza o valor total do orçamento
}

function calcularValorFinal() {
  let totalOrcamento = 0;
  document.querySelectorAll('#tabelaServicos tbody .total-servico').forEach(td => {
    totalOrcamento += parseFloat(td.textContent) || 0;
  });
  document.getElementById('valorFinal').textContent = `Total do Orçamento: R$ ${totalOrcamento.toFixed(2).replace('.', ',')}`;
}

function adicionarServico() {
  const tbody = document.querySelector('#tabelaServicos tbody');
  if (!tbody) {
    console.error("Elemento tbody da tabela de serviços não encontrado.");
    return;
  }

  const newRow = document.createElement('tr');
  newRow.innerHTML = `
      <td>
          <select class="servico-select">
              <!-- Options will be populated by popularSelectServico -->
          </select>
      </td>
      <td><input type="number" class="valor-unitario" step="0.01" min="0" value="0.00" readonly></td>
      <td><input type="number" class="quantidade" min="1" step="1" value="1"></td>
      <td class="total-servico">0.00</td>
      <td><button type="button" class="remover-linha-btn btn btn-danger btn-sm">Remover</button></td>
  `;
  tbody.appendChild(newRow);
  setupRowEventListeners(newRow);

  // Garante que o valor unitário e o total da nova linha sejam processados pela lógica JS
  const newSelect = newRow.querySelector('.servico-select');
  atualizarValorUnitario(newSelect);

  newRow.classList.add('highlight-new-row');
  setTimeout(() => newRow.classList.remove('highlight-new-row'), 700);
  newRow.querySelector('.servico-select').focus();
}

function removerLinha(buttonElement) {
  const serviceRow = buttonElement.closest('tr');
  serviceRow.remove();
  calcularValorFinal();
}

function salvarOrcamento() {
  const cliente = document.getElementById('cliente').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const linhas = [];

  document.querySelectorAll('#tabelaServicos tbody tr').forEach(tr => {
    const servicoSelect = tr.querySelector('.servico-select');
    if (servicoSelect && servicoSelect.value) { // Garante que um serviço foi selecionado
      linhas.push({
        servico: servicoSelect.value,
        servicoTexto: servicoSelect.options[servicoSelect.selectedIndex].text,
        quantidade: tr.querySelector('.quantidade').value,
        valorUnitario: tr.querySelector('.valor-unitario').value,
        total: tr.querySelector('.total-servico').textContent
      });
    }
  });

  if (linhas.length === 0) {
    alert('Adicione ao menos um serviço para salvar o orçamento.');
    return;
  }

  let orcamentos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  orcamentos.push({
    data: new Date().toISOString(),
    cliente: cliente || "Orçamento Rápido",
    email,
    telefone,
    linhas,
    totalFinal: document.getElementById('valorFinal').textContent
  });
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orcamentos));
  alert('Orçamento salvo!');
  listarOrcamentosSalvos();
}

// Função para listar os orçamentos salvos
function listarOrcamentosSalvos() {
  const container = document.getElementById('listaOrcamentosSalvos');
  container.innerHTML = ''; // Limpa o conteúdo anterior

  const orcamentos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');

  if (orcamentos.length === 0) {
    container.innerHTML = '<p class="orcamentos-salvos-vazio">Nenhum orçamento salvo encontrado.</p>';
    return;
  }

  const h3 = document.createElement('h3');
  h3.textContent = 'Orçamentos Salvos';
  container.appendChild(h3);

  // Adiciona o botão "Apagar Todos" apenas se houver orçamentos
  if (orcamentos.length > 0) {
    const apagarTodosBtn = document.createElement('button');
    apagarTodosBtn.type = 'button';
    apagarTodosBtn.id = 'apagarTodosOrcamentosBtn';
    apagarTodosBtn.className = 'btn btn-danger btn-sm';
    apagarTodosBtn.textContent = 'Apagar Todos os Orçamentos';
    apagarTodosBtn.onclick = apagarTodosOrcamentos;
    container.appendChild(apagarTodosBtn);
  }

  const ul = document.createElement('ul');
  ul.className = 'orcamentos-salvos-list';
  container.appendChild(ul);

  // Ordena os orcamentos do mais recente para o mais antigo
  orcamentos.sort((a, b) => new Date(b.data) - new Date(a.data));

  orcamentos.forEach((orcamento, index) => {
    const li = document.createElement('li');

    const infoDiv = document.createElement('div');
    infoDiv.className = 'orcamentos-salvos-info';
    const clienteNome = orcamento.cliente || 'Cliente não informado';
    const dataFormatada = new Date(orcamento.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    infoDiv.innerHTML = `<b>${clienteNome}</b> <span class="orcamento-meta-info">- ${dataFormatada}</span>`;

    const btnsDiv = document.createElement('div');
    btnsDiv.className = 'orcamentos-salvos-btns';

    const carregarBtn = document.createElement('button');
    carregarBtn.type = 'button';
    carregarBtn.className = 'btn btn-secondary btn-sm';
    carregarBtn.textContent = 'Carregar';
    carregarBtn.onclick = () => carregarOrcamentoSalvo(index);

    const excluirBtn = document.createElement('button');
    excluirBtn.type = 'button';
    excluirBtn.className = 'btn btn-danger btn-sm';
    excluirBtn.textContent = 'Excluir';
    excluirBtn.onclick = () => excluirOrcamentoSalvo(index);

    btnsDiv.appendChild(carregarBtn);
    btnsDiv.appendChild(excluirBtn);
    li.appendChild(infoDiv);
    li.appendChild(btnsDiv);
    ul.appendChild(li);
  });
}

// Função para apagar todos os orçamentos salvos
function apagarTodosOrcamentos() {
  if (confirm('Tem certeza que deseja apagar TODOS os orçamentos salvos? Esta ação não pode ser desfeita.')) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    listarOrcamentosSalvos();
    alert('Todos os orçamentos salvos foram apagados.');
  }
}

// Função para excluir um orçamento salvo
function excluirOrcamentoSalvo(index) {
  let orcamentos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  orcamentos.splice(index, 1); // Remove o orçamento pelo índice
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orcamentos));
  listarOrcamentosSalvos(); // Atualiza a lista
}

// Função para carregar um orçamento salvo
function carregarOrcamentoSalvo(index) {
  const orcamentos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  const orcamento = orcamentos[index];
  if (!orcamento) {
    alert('Erro ao carregar o orçamento. O orçamento selecionado não foi encontrado.');
    return;
  }

  // Limpa os campos do formulário e os serviços existentes
  const formOrcamento = document.getElementById('formOrcamento');
  if (formOrcamento) {
    formOrcamento.reset(); // Reseta o formulário
  }

  const tbody = document.querySelector('#tabelaServicos tbody');
  if (tbody) {
    tbody.innerHTML = ''; // Remove todas as linhas de serviço
  }

  // Preenche os dados do cliente
  const clienteInput = document.getElementById('cliente');
  const emailInput = document.getElementById('email');
  const telefoneInput = document.getElementById('telefone');

  if (clienteInput) clienteInput.value = orcamento.cliente || '';
  if (emailInput) emailInput.value = orcamento.email || '';
  if (telefoneInput) telefoneInput.value = orcamento.telefone || '';

  // Adiciona os serviços do orçamento salvo
  orcamento.linhas.forEach(linha => {
    adicionarServico(); // Adiciona uma nova linha de serviço
    const trsServico = tbody.querySelectorAll('tr:not(.descricao-row)');
    const trServico = trsServico[trsServico.length - 1]; // Seleciona a última linha adicionada
    const select = trServico.querySelector('.servico-select');
    select.value = linha.servico;
    select.dispatchEvent(new Event('change')); // Dispara o evento para atualizar o valor unitario
    trServico.querySelector('.quantidade').value = linha.quantidade;
    trServico.querySelector('.valor-unitario').value = linha.valorUnitario;
    calcularTotalServico(trServico); // Calcula o total da linha
  });

  calcularValorFinal(); // Atualiza o valor total do orçamento
  alert('Orçamento carregado com sucesso!');
}

function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'A4'
  });

  // Configuração de margens
  const margemEsquerda = 10;
  const margemTopo = 10;
  const margemRodape = 290; // Altura total da página é 297mm

  // Cabeçalho
  const logo = new Image();
  logo.src = 'Logotipo Brasão.png'; // Certifique-se de que o caminho está correto
  logo.onload = function () {
    doc.addImage(logo, 'PNG', margemEsquerda, margemTopo, 30, 30); // Adiciona o logotipo
    doc.setFontSize(20);
    doc.text('SofTech Serviços e Tecnologia', margemEsquerda + 40, margemTopo + 10);
    doc.setFontSize(14);
    doc.text('Telefone: (93) 9 8115-4627 | E-mail: softechservicosetecnologia@gmail.com', margemEsquerda + 40, margemTopo + 20);

    // Corpo do PDF
    let y = margemTopo + 40; // Posição inicial do conteúdo
    doc.setFontSize(12);
    doc.text('Serviço', margemEsquerda, y);
    doc.text('Qtd.', margemEsquerda + 80, y); // Ajusta a posição da coluna
    doc.text('Valor Unit.', margemEsquerda + 110, y);
    doc.text('Total', margemEsquerda + 140, y);
    y += 10;

    document.querySelectorAll('#tabelaServicos tbody tr:not(.descricao-row)').forEach(tr => {
      const servico = tr.querySelector('.servico-select').value || 'Não informado';
      const quantidade = tr.querySelector('.quantidade').value || '0';
      const valorUnitario = tr.querySelector('.valor-unitario').value || '0.00';
      const total = tr.querySelector('.total-servico').textContent || '0.00';

      // Quebra de texto para o nome do serviço
      const larguraColunaServico = 70; // Define a largura máxima da coluna "Serviço"
      const linhasServico = doc.splitTextToSize(servico, larguraColunaServico);

      linhasServico.forEach((linha, index) => {
        doc.text(linha, margemEsquerda, y + (index * 6)); // Adiciona cada linha do serviço
      });

      const alturaLinhas = (linhasServico.length - 1) * 6; // Calcula a altura ocupada pelas linhas do serviço
      doc.text(quantidade, margemEsquerda + 80, y); // Ajusta a posição da coluna "Qtd."
      doc.text(`R$ ${valorUnitario}`, margemEsquerda + 110, y);
      doc.text(`R$ ${total}`, margemEsquerda + 140, y);
      y += 10 + alturaLinhas; // Ajusta a posição Y com base na quantidade de linhas

      // Adiciona nova página se necessário
      if (y > margemRodape - 10) {
        doc.addPage();
        y = margemTopo + 40; // Reinicia a posição Y na nova página
        doc.setFontSize(12);
        doc.text('Serviço', margemEsquerda, y);
        doc.text('Qtd.', margemEsquerda + 80, y);
        doc.text('Valor Unit.', margemEsquerda + 110, y);
        doc.text('Total', margemEsquerda + 140, y);
        y += 10;
      }
    });

    // Rodapé
    doc.setFontSize(12);
    doc.text('Obrigado por confiar na SofTech Serviços e Tecnologia!', margemEsquerda, margemRodape - 10);
    doc.text('© 2025 SofTech Serviços e Tecnologia. Todos os direitos reservados.', margemEsquerda, margemRodape - 5);

    // Salva o PDF
    doc.save('orcamento-copias-softech.pdf');
  };

  // Caso o logotipo não carregue, exiba uma mensagem de erro
  logo.onerror = function () {
    console.error('Erro ao carregar o logotipo. Verifique o caminho do arquivo.');
    alert('Não foi possível carregar o logotipo. O PDF será gerado sem ele.');
    doc.setFontSize(20);
    doc.text('SofTech Serviços e Tecnologia', margemEsquerda + 40, margemTopo + 10);
    doc.setFontSize(14);
    doc.text('Telefone: (93) 9 8115-4627 | E-mail: softechservicosetecnologia@gmail.com', margemEsquerda + 40, margemTopo + 20);

    // Corpo do PDF
    let y = margemTopo + 40;
    doc.setFontSize(12);
    doc.text('Serviço', margemEsquerda, y);
    doc.text('Qtd.', margemEsquerda + 80, y);
    doc.text('Valor Unit.', margemEsquerda + 110, y);
    doc.text('Total', margemEsquerda + 140, y);
    y += 10;

    document.querySelectorAll('#tabelaServicos tbody tr:not(.descricao-row)').forEach(tr => {
      const servico = tr.querySelector('.servico-select').value || 'Não informado';
      const quantidade = tr.querySelector('.quantidade').value || '0';
      const valorUnitario = tr.querySelector('.valor-unitario').value || '0.00';
      const total = tr.querySelector('.total-servico').textContent || '0.00';

      const larguraColunaServico = 70;
      const linhasServico = doc.splitTextToSize(servico, larguraColunaServico);

      linhasServico.forEach((linha, index) => {
        doc.text(linha, margemEsquerda, y + (index * 6));
      });

      const alturaLinhas = (linhasServico.length - 1) * 6;
      doc.text(quantidade, margemEsquerda + 80, y);
      doc.text(`R$ ${valorUnitario}`, margemEsquerda + 110, y);
      doc.text(`R$ ${total}`, margemEsquerda + 140, y);
      y += 10 + alturaLinhas;

      if (y > margemRodape - 10) {
        doc.addPage();
        y = margemTopo + 40;
        doc.setFontSize(12);
        doc.text('Serviço', margemEsquerda, y);
        doc.text('Qtd.', margemEsquerda + 80, y);
        doc.text('Valor Unit.', margemEsquerda + 110, y);
        doc.text('Total', margemEsquerda + 140, y);
        y += 10;
      }
    });

    doc.setFontSize(12);
    doc.text('Obrigado por confiar na SofTech Serviços e Tecnologia!', margemEsquerda, margemRodape - 10);
    doc.text('© 2025 SofTech Serviços e Tecnologia. Todos os direitos reservados.', margemEsquerda, margemRodape - 5);

    doc.save('orcamento-copias-softech.pdf');
  };
}

function exportarCSV() {
  let csv = 'SofTech Serviços e Tecnologia\n';
  csv += 'Telefone: (93) 9 8115-4627 | E-mail: softechservicosetecnologia@gmail.com\n\n';
  csv += 'Serviço;Quantidade;Valor Unitário;Total\n';

  document.querySelectorAll('#tabelaServicos tbody tr').forEach(tr => {
    const servicoSelect = tr.querySelector('.servico-select');
    if (servicoSelect && servicoSelect.value) {
      const servico = servicoSelect.options[servicoSelect.selectedIndex].text.replace(/"/g, '""');
      const valorUnitario = tr.querySelector('.valor-unitario').value;
      const quantidade = tr.querySelector('.quantidade').value;
      const total = tr.querySelector('.total-servico').textContent;
      csv += `"${servico}";${quantidade};${valorUnitario};${total}\n`;
    }
  });

  csv += '\nObrigado por confiar na SofTech Serviços e Tecnologia.\n';
  csv += '© 2025 SofTech Serviços e Tecnologia. Todos os direitos reservados.\n';

  const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'orcamento-softech.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function enviarWhatsapp() {
  const telefoneCliente = document.getElementById('telefone').value.replace(/\D/g, '');
  const nomeCliente = document.getElementById('cliente').value || "Prezado(a) Cliente";

  let mensagem = `SofTech Serviços e Tecnologia\n`;
  mensagem += `Telefone: (93) 9 8115-4627 | E-mail: softechservicosetecnologia@gmail.com\n\n`;
  mensagem += `Olá ${nomeCliente},%0A%0A`;
  mensagem += `Segue seu orçamento de cópias:%0A%0A`;

  document.querySelectorAll('#tabelaServicos tbody tr').forEach(tr => {
    const servicoSelect = tr.querySelector('.servico-select');
    if (servicoSelect && servicoSelect.value) {
      const servico = servicoSelect.options[servicoSelect.selectedIndex].text;
      const quantidade = tr.querySelector('.quantidade').value;
      const valorUnitario = tr.querySelector('.valor-unitario').value;
      const total = tr.querySelector('.total-servico').textContent;
      mensagem += `- ${servico} | Qtd: ${quantidade} | Unit: R$ ${valorUnitario} | Total: R$ ${total}%0A`;
    }
  });

  mensagem += `%0AObrigado por confiar na SofTech Serviços e Tecnologia!%0A`;
  mensagem += `© 2025 SofTech Serviços e Tecnologia. Todos os direitos reservados.%0A`;

  const url = `https://wa.me/55${telefoneCliente}?text=${mensagem}`;
  window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  const tabelaBody = document.querySelector('#tabelaServicos tbody');
  if (tabelaBody) {
    // Configura a primeira linha da tabela (que já existe no HTML)
    const primeiraLinha = tabelaBody.querySelector('tr:not(.descricao-row)');
    if (primeiraLinha) {
      const select = primeiraLinha.querySelector('.servico-select');
      const quantidadeInput = primeiraLinha.querySelector('.quantidade');

      if (select) {
        popularSelectServico(select); // Popula o select com os serviços
        atualizarValorUnitario(select); // Atualiza o valor unitário com base no serviço selecionado
        select.addEventListener('change', () => atualizarValorUnitario(select)); // Adiciona o evento 'change'
      }

      if (quantidadeInput) {
        quantidadeInput.addEventListener('input', () => calcularTotalServico(primeiraLinha)); // Adiciona o evento 'input'
        calcularTotalServico(primeiraLinha); // Garante que o cálculo seja realizado ao carregar
      }
    }
  } else {
    console.error("Corpo da tabela de serviços (#tabelaServicos tbody) não encontrado.");
  }
});

const adicionarServicoBtn = document.getElementById('adicionarServicoBtn');
if (adicionarServicoBtn) adicionarServicoBtn.addEventListener('click', adicionarServico);

const salvarOrcamentoBtn = document.getElementById('salvarOrcamentoBtn');
if (salvarOrcamentoBtn) salvarOrcamentoBtn.addEventListener('click', salvarOrcamento);

const gerarPDFBtn = document.getElementById('gerarPDFBtn');
if (gerarPDFBtn) gerarPDFBtn.addEventListener('click', gerarPDF);

const exportarCSVBtn = document.getElementById('exportarCSVBtn');
if (exportarCSVBtn) exportarCSVBtn.addEventListener('click', exportarCSV);

const enviarWhatsappBtn = document.getElementById('enviarWhatsappBtn');
if (enviarWhatsappBtn) enviarWhatsappBtn.addEventListener('click', enviarWhatsapp);

const formOrcamento = document.getElementById('formOrcamento');
if (formOrcamento) {
    formOrcamento.addEventListener('submit', function(e) {
  e.preventDefault();
  const emailCliente = document.getElementById('email').value;
  const nomeCliente = document.getElementById('cliente').value || "Prezado(a) Cliente";

  let corpo = `SofTech Serviços e Tecnologia\n`;
  corpo += `Telefone: (93) 9 8115-4627 | E-mail: softechservicosetecnologia@gmail.com\n\n`;
  corpo += `Olá ${nomeCliente},\n\nSegue seu orçamento de cópias:\n\n`;

  document.querySelectorAll('#tabelaServicos tbody tr').forEach(tr => {
    const servicoSelect = tr.querySelector('.servico-select');
    if (servicoSelect && servicoSelect.value) {
      const servico = servicoSelect.options[servicoSelect.selectedIndex].text;
      const quantidade = tr.querySelector('.quantidade').value;
      const valorUnitario = tr.querySelector('.valor-unitario').value;
      const total = tr.querySelector('.total-servico').textContent;
      corpo += `- ${servico} | Qtd: ${quantidade} | Unit: R$ ${valorUnitario} | Total: R$ ${total}\n`;
    }
  });

  corpo += `\nObrigado por confiar na SofTech Serviços e Tecnologia.\n`;
  corpo += `© 2025 SofTech Serviços e Tecnologia. Todos os direitos reservados.\n`;

  const assunto = encodeURIComponent('Orçamento de Cópias SofTech');
  const corpoFinal = encodeURIComponent(corpo);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailCliente)}&su=${assunto}&body=${corpoFinal}`;
  window.open(gmailUrl, '_blank');
});
}

listarOrcamentosSalvos();

function removerTodosServicos() {
  const tbody = document.querySelector('#tabelaServicos tbody');
  if (tbody) {
    tbody.innerHTML = ''; // Remove todas as linhas de serviço
    calcularValorFinal(); // Atualiza o valor total para zero
    alert('Todos os serviços foram removidos.');
  } else {
    console.error("Elemento tbody da tabela de serviços não encontrado.");
  }
}

// Adiciona o evento ao botão de remover todos os serviços
const removerTodosServicosBtn = document.getElementById('removerTodosServicosBtn');
if (removerTodosServicosBtn) {
  removerTodosServicosBtn.addEventListener('click', removerTodosServicos);
}