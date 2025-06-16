const valoresServico = {
  "Instalação de sistema operacional (Windows, Linux)": 250.00,
  "Manutenção preventiva em impressoras": 150.00,
  "Suporte técnico remoto": 100.00,
  "Backup em nuvem (configuração e instrução)": 80.00,
  "Configuração de rede doméstica/pequena empresa": 200.00,
  "Licenciamento de software (auxílio e regularização)": 300.00,
  "Impressão de documentos (Preto e Branco – por página)": 1.00,
  "Impressão de documentos (Colorida – por página)": 2.00,
  "Digitalização de documentos (por página)": 1.00,
  "Plastificação de documentos A4": 3.00,
  "Plastificação de documentos menores que A4": 2.00,
  "Corte com guilhotina (até 20 folhas)": 2.00,
  "Elaboração de currículo personalizado": 15.00,
  "Redação de documentos simples (declarações, requerimentos etc.)": 10.00,
  "Formatação de documentos (TCC, monografias, relatórios)": 20.00,
  "Serviços Detran (auxílio online – emissão, agendamentos, etc.)": 15.00,
  "Impressão de boletos/documentos oficiais": 5.00,
  "Suporte em serviços públicos online (Gov.br, INSS, etc.)": 10.00,
  "Suporte para serviços bancários online": 10.00,
  "Vendas de itens de papelaria (canetas, lápis, borrachas etc.)": null,
  "Vendas de suprimentos de informática (pendrive, mouse, cabos etc.)": null,
  "Criação de sites simples para empresas/comércio local": 300.00,
  "Criação de landing pages promocionais": 200.00,
  "Atualização/manutenção de site existente": 150.00,
  "Criação de contas profissionais (Google, e-mail, redes sociais)": 50.00,
  "Formatação de Computador": 50.00,
  "Instalação de Impressora": 30.00,
  "Remoção de Vírus": 40.00,
  "Backup de Dados": 35.00,
  "Elaboração de Contratos Simples": 20.00,
  "Upgrades de Hardware (Memória RAM, SSD)": 100.00,
  "Limpeza Física Interna (PCs e Notebooks)": 120.00,
  "Diagnóstico Avançado de Hardware": 70.00,
  "Consultoria para Compra de Equipamentos": 60.00,
  "Aulas Básicas de Informática (por hora)": 50.00,
  "Pacote de Manutenção Mensal/Trimestral": null,
  "Pacote 'PC Novo Pronto para Usar'": 280.00
};

const LOCAL_STORAGE_KEY_GERADOR = 'orcamentosSofTech';

const servicosEditaveis = Object.freeze([ // Usar Object.freeze para imutabilidade
  "Vendas de itens de papelaria (canetas, lápis, borrachas etc.)",
  "Vendas de suprimentos de informática (pendrive, mouse, cabos etc.)",
  "Pacote de Manutenção Mensal/Trimestral"
]);

// Popular o select de serviços
function popularSelect(select) {
  select.innerHTML = '<option value="">Selecione</option>';
  Object.entries(valoresServico).forEach(([servico]) => {
    const opt = document.createElement('option');
    opt.value = servico;
    opt.textContent = servico;
    select.appendChild(opt);
  });
}

// Função auxiliar para configurar event listeners para uma linha de serviço
function setupRowEventListeners(serviceRow, descriptionRow) {
  const select = serviceRow.querySelector('.servico-select');
  const quantidade = serviceRow.querySelector('.quantidade');
  const valorUnitario = serviceRow.querySelector('.valor-unitario');
  const removerBtn = serviceRow.querySelector('.remover-servico');

  popularSelect(select);
  valorUnitario.readOnly = true; // Começa como readonly

  select.addEventListener('change', function() {
    atualizarValorUnitario(this); // 'this' é o elemento select
  });

  quantidade.addEventListener('input', function() { // 'input' para feedback imediato
    calcularTotalServico(serviceRow);
  });

  valorUnitario.addEventListener('input', function() { // 'input' para feedback imediato
    calcularTotalServico(serviceRow);
  });

  removerBtn.addEventListener('click', function() {
    serviceRow.remove();
    if (descriptionRow) descriptionRow.remove();
    atualizarValorFinal();
  });
}

// Adiciona uma nova linha de serviço
function adicionarServico() {
  const tbody = document.querySelector('#tabelaServicos tbody');
  if (!tbody) {
    console.error("Elemento tbody da tabela de serviços não encontrado.");
    return;
  }


  // Linha principal do serviço
  const linhaServico = document.createElement('tr');
  linhaServico.innerHTML = `
    <td>
      <select class="servico-select"></select>
    </td>
    <td>
      <input type="number" class="quantidade" min="1" value="1">
    </td>
    <td>
      <input type="number" class="valor-unitario" min="0" step="0.01" value="0.00" readonly>
    </td>
    <td class="total-servico">0.00</td>
    <td>
      <button type="button" class="remover-servico btn btn-danger btn-sm">Remover</button>
    </td>
  `;

  // Linha da descrição adicional
  const linhaDescricao = document.createElement('tr');
  linhaDescricao.classList.add('descricao-row');
  linhaDescricao.innerHTML = `
    <td colspan="5">
      <textarea class="descricao-servico" placeholder="Descrição adicional para este serviço"></textarea>
    </td>
  `;

  tbody.appendChild(linhaServico);
  tbody.appendChild(linhaDescricao);

  setupRowEventListeners(linhaServico, linhaDescricao);

  linhaServico.classList.add('highlight-new-row');
  setTimeout(() => linhaServico.classList.remove('highlight-new-row'), 700);
  linhaServico.querySelector('.servico-select').focus(); // Foco no novo select
}

// Remove todas as linhas de serviço
function limparServicos() {
  const tbody = document.querySelector('#tabelaServicos tbody');
  tbody.innerHTML = '';
  atualizarValorFinal(); // Garante que o total seja zerado
}

// Atualiza o valor unitário ao selecionar um serviço
function atualizarValorUnitario(selectElement) {
  const serviceRow = selectElement.closest('tr');
  const valorUnitarioInput = serviceRow.querySelector('.valor-unitario');
  const servicoSelecionado = selectElement.value;

  if (!servicoSelecionado) {
    valorUnitarioInput.value = "0.00";
    valorUnitarioInput.readOnly = true;
  } else {
    const precoBase = valoresServico[servicoSelecionado];
    valorUnitarioInput.value = precoBase ? precoBase.toFixed(2) : "0.00";
    valorUnitarioInput.readOnly = !servicosEditaveis.includes(servicoSelecionado);
  }
  calcularTotalServico(serviceRow);
}

// Calcula o total do serviço na linha
function calcularTotalServico(serviceRowElement) {
  const valorUnitarioInput = serviceRowElement.querySelector('.valor-unitario');
  const quantidadeInput = serviceRowElement.querySelector('.quantidade');
  const totalServicoTd = serviceRowElement.querySelector('.total-servico');

  const valorUnitario = parseFloat(valorUnitarioInput.value) || 0;
  const quantidade = parseInt(quantidadeInput.value) || 0;
  let total = valorUnitario * quantidade;

  // Desconto progressivo
  let desconto = 0;
  if (quantidade > 200) {
    desconto = 0.15;
  } else if (quantidade > 100) {
    desconto = 0.10;
  } else if (quantidade > 50) {
    desconto = 0.05;
  }
  total = total * (1 - desconto);

  totalServicoTd.textContent = total.toFixed(2);
  atualizarValorFinal(); // Atualiza o total geral sempre que um total de linha muda
}

// Atualiza o valor final do orçamento
function atualizarValorFinal() {
  let total = 0;
  document.querySelectorAll('.total-servico').forEach(td => {
    total += parseFloat(td.textContent) || 0;
  });
  document.getElementById('valorFinal').textContent = `Valor Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Salva orçamento
function salvarOrcamento() {
  const linhas = [];
  document.querySelectorAll('#tabelaServicos tbody tr').forEach(tr => {
    const servicoSelect = tr.querySelector('.servico-select');
    if (servicoSelect && servicoSelect.value) {
      linhas.push({
        servico: servicoSelect.value,
        quantidade: tr.querySelector('.quantidade').value,
        valorUnitario: tr.querySelector('.valor-unitario').value,
        total: tr.querySelector('.total-servico').textContent
      });
    }
  });

  const cliente = document.getElementById('cliente').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;

  const orcamentos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_GERADOR) || '[]');
  orcamentos.push({
    data: new Date().toISOString(),
    cliente,
    email,
    telefone,
    linhas
  });
  localStorage.setItem(LOCAL_STORAGE_KEY_GERADOR, JSON.stringify(orcamentos));
  alert('Orçamento salvo!');
}

// Lista orçamentos salvos
function listarOrcamentosSalvos() {
  const container = document.getElementById('listaOrcamentosSalvos');
  container.innerHTML = ''; // Limpa conteúdo anterior

  const orcamentos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_GERADOR) || '[]');

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
    apagarTodosBtn.className = 'btn btn-danger btn-sm'; // Estilo similar aos outros botões de exclusão
    apagarTodosBtn.textContent = 'Apagar Todos os Orçamentos';
    // apagarTodosBtn.style.marginBottom = '1rem'; // Espaçamento agora controlado pelo CSS via ID
    apagarTodosBtn.onclick = apagarTodosOrcamentos;
    container.appendChild(apagarTodosBtn);
  }

  const ul = document.createElement('ul');
  ul.className = 'orcamentos-salvos-list';
  container.appendChild(ul);

  // Ordena os orçamentos do mais recente para o mais antigo
  orcamentos.sort((a, b) => new Date(b.data) - new Date(a.data));

  orcamentos.forEach((orc) => {
    const li = document.createElement('li');

    const infoDiv = document.createElement('div');
    infoDiv.className = 'orcamentos-salvos-info';
    const clienteNome = orc.cliente || 'Cliente não informado';
    const dataFormatada = new Date(orc.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    infoDiv.innerHTML = `<b>${clienteNome}</b> <span class="orcamento-meta-info">- ${dataFormatada}</span>`;

    const btnsDiv = document.createElement('div');
    btnsDiv.className = 'orcamentos-salvos-btns';

    const carregarBtn = document.createElement('button');
    carregarBtn.type = 'button';
    carregarBtn.className = 'btn btn-secondary btn-sm';
    carregarBtn.textContent = 'Carregar';
    carregarBtn.dataset.orcamentoId = orc.data; // Armazena o ID único (timestamp)
    carregarBtn.onclick = function() {
      const orcamentoId = this.dataset.orcamentoId;
      const allOrcamentos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_GERADOR) || '[]');
      const originalIndex = allOrcamentos.findIndex(o => o.data === orcamentoId);
      if (originalIndex !== -1) {
        carregarOrcamentoSalvo(originalIndex);
      } else {
        alert("Erro: Orçamento não encontrado para carregar.");
        listarOrcamentosSalvos(); // Atualiza a lista se o item estiver faltando
      }
    };

    const excluirBtn = document.createElement('button');
    excluirBtn.type = 'button';
    excluirBtn.className = 'btn btn-danger btn-sm excluir';
    excluirBtn.textContent = 'Excluir';
    excluirBtn.dataset.orcamentoId = orc.data; // Armazena o ID único (timestamp)
    excluirBtn.onclick = function() {
      if (confirm('Tem certeza que deseja excluir este orçamento?')) {
        const orcamentoId = this.dataset.orcamentoId;
        const allOrcamentos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_GERADOR) || '[]');
        const originalIndex = allOrcamentos.findIndex(o => o.data === orcamentoId);
        if (originalIndex !== -1) {
          excluirOrcamentoSalvo(originalIndex);
        } else {
          alert("Erro: Orçamento não encontrado para excluir.");
          listarOrcamentosSalvos(); // Atualiza a lista
        }
      }
    };

    btnsDiv.appendChild(carregarBtn);
    btnsDiv.appendChild(excluirBtn);
    li.appendChild(infoDiv);
    li.appendChild(btnsDiv);
    ul.appendChild(li);
  });
}

function excluirOrcamentoSalvo(idx) {
  const orcamentos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_GERADOR) || '[]');
  orcamentos.splice(idx, 1);
  localStorage.setItem(LOCAL_STORAGE_KEY_GERADOR, JSON.stringify(orcamentos));
  listarOrcamentosSalvos(); // Atualiza a lista
}
// Função para apagar todos os orçamentos salvos
function apagarTodosOrcamentos() {
  if (confirm('Tem certeza que deseja apagar TODOS os orçamentos salvos? Esta ação não pode ser desfeita.')) {
    localStorage.removeItem(LOCAL_STORAGE_KEY_GERADOR); // Remove a chave do localStorage
    listarOrcamentosSalvos(); // Atualiza a lista, que agora estará vazia
    alert('Todos os orçamentos salvos foram apagados.');
  }
}


// Carrega orçamento salvo pelo índice
function carregarOrcamentoSalvo(idx) {
  const orcamentos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_GERADOR) || '[]');
  const orc = orcamentos[idx];
  if (!orc) return;

  document.getElementById('formOrcamento').reset(); // Limpa campos do cliente
  limparServicos(); // Limpa a tabela de serviços

  document.getElementById('cliente').value = orc.cliente || '';
  document.getElementById('email').value = orc.email || '';
  document.getElementById('telefone').value = orc.telefone || '';

  const tbody = document.querySelector('#tabelaServicos tbody');
  if (!tbody) {
    console.error("Elemento tbody da tabela de serviços não encontrado ao carregar orçamento.");
    return;
  }
  orc.linhas.forEach(linha => {
    adicionarServico(); // Adiciona uma nova linha e configura seus listeners
    const trsServico = tbody.querySelectorAll('tr:not(.descricao-row)');
    const trServico = trsServico[trsServico.length - 1]; // Pega a última linha de serviço adicionada
    const trDescricao = trServico.nextElementSibling;

    const select = trServico.querySelector('.servico-select');
    select.value = linha.servico;
    // Disparar 'change' no select para que atualizarValorUnitario seja chamado
    select.dispatchEvent(new Event('change'));

    trServico.querySelector('.quantidade').value = linha.quantidade;

    // Se o serviço for editável, o valor unitário já foi setado por atualizarValorUnitario
    // Se não for, ele também já foi setado.
    // No entanto, se o valor salvo for diferente do padrão (ex: um serviço que ERA editável e não é mais),
    // precisamos garantir que o valor salvo seja usado se for editável.
    if (servicosEditaveis.includes(linha.servico)) {
      const valorUnitarioInput = trServico.querySelector('.valor-unitario');
      valorUnitarioInput.value = parseFloat(linha.valorUnitario).toFixed(2);
    }
    
    // Disparar 'input' na quantidade e valor unitário para recalcular totais
    trServico.querySelector('.quantidade').dispatchEvent(new Event('input'));
    trServico.querySelector('.valor-unitario').dispatchEvent(new Event('input')); // Mesmo que readonly, para consistência se a lógica mudar

    if (trDescricao && trDescricao.classList.contains('descricao-row')) {
      trDescricao.querySelector('.descricao-servico').value = linha.descricao || '';
    }
    // calcularTotalServico(trServico); // Já é chamado pelos dispatchEvent('input')
  });
  atualizarValorFinal(); // Garante que o total final seja atualizado após carregar todas as linhas
  alert('Orçamento carregado com sucesso!');
}

// Exporta orçamento para CSV
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

// Exporta orçamento para XLSX
function exportarXLSX() {
  const workbook = XLSX.utils.book_new();
  const dados = [['Serviço', 'Quantidade', 'Valor Unitário', 'Total', 'Descrição']];

  document.querySelectorAll('#tabelaServicos tbody tr:not(.descricao-row)').forEach(tr => {
    const servico = tr.querySelector('.servico-select').value;
    const quantidade = tr.querySelector('.quantidade').value;
    const valorUnitario = tr.querySelector('.valor-unitario').value;
    const total = tr.querySelector('.total-servico').textContent;
    const descricaoRow = tr.nextElementSibling;
    const descricao = descricaoRow && descricaoRow.classList.contains('descricao-row') ? descricaoRow.querySelector('.descricao-servico').value : '';
    dados.push([servico, quantidade, valorUnitario, total, descricao]);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(dados);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Orçamento');
  XLSX.writeFile(workbook, 'orcamento-softech.xlsx');
}

// Eventos dos botões fixos no HTML
document.addEventListener('DOMContentLoaded', () => {
  // Botões principais
  const adicionarServicoBtn = document.getElementById('adicionarServicoBtn');
  if (adicionarServicoBtn) adicionarServicoBtn.addEventListener('click', adicionarServico);

  const salvarOrcamentoBtn = document.getElementById('salvarOrcamentoBtn');
  if (salvarOrcamentoBtn) salvarOrcamentoBtn.addEventListener('click', salvarOrcamento);

  const exportarCSVBtn = document.getElementById('exportarCSVBtn');
  if (exportarCSVBtn) exportarCSVBtn.addEventListener('click', exportarCSV);

  const gerarPDFBtn = document.getElementById('gerarPDFBtn');
  if (gerarPDFBtn) gerarPDFBtn.addEventListener('click', gerarPDF);

  const enviarWhatsappBtn = document.getElementById('enviarWhatsappBtn');
  if (enviarWhatsappBtn) {
    enviarWhatsappBtn.addEventListener('click', function() {
      const telefoneCliente = document.getElementById('telefone').value.replace(/\D/g, '');
      const nomeCliente = document.getElementById('cliente').value || "Prezado(a) Cliente";

      if (!telefoneCliente) {
          alert("Por favor, informe o número de telefone do cliente.");
          return;
      }

      let mensagem = `Olá ${nomeCliente},%0A%0A`;
      mensagem += `É um prazer atendê-lo(a)! Segue abaixo o seu orçamento personalizado:%0A%0A`;

      mensagem += `Serviços:%0A`;
      document.querySelectorAll('#tabelaServicos tbody tr:not(.descricao-row)').forEach(tr => {
          const servicoSelect = tr.querySelector('.servico-select');
          if (!servicoSelect) return; // Pular se o select não for encontrado
          const servico = servicoSelect.value;
          const quantidadeInput = tr.querySelector('.quantidade');
          const valorUnitarioInput = tr.querySelector('.valor-unitario');
          const totalTd = tr.querySelector('.total-servico');

          // Garantir que os elementos existem antes de acessar 'value' ou 'textContent'
          const quantidade = quantidadeInput ? quantidadeInput.value : 'N/A';
          const valorUnitario = valorUnitarioInput ? valorUnitarioInput.value : 'N/A';
          const total = totalTd ? totalTd.textContent : 'N/A';

          const descricaoRow = tr.nextElementSibling;
          const descricaoTextarea = descricaoRow && descricaoRow.classList.contains('descricao-row') ? descricaoRow.querySelector('.descricao-servico') : null;
          const descricao = descricaoTextarea ? descricaoTextarea.value : '';
          
          if (servico) { // Apenas adiciona à mensagem se um serviço foi selecionado
              mensagem += `- ${servico} | Qtd: ${quantidade} | Unit: R$ ${parseFloat(valorUnitario).toFixed(2).replace('.',',')} | Total: R$ ${parseFloat(total).toFixed(2).replace('.',',')}`;
              if (descricao) mensagem += `%0A  Observação: ${encodeURIComponent(descricao)}`;
              mensagem += `%0A`;
          }
      });

      mensagem += `%0A${document.getElementById('valorFinal').textContent.replace('Valor Total: ', 'Valor Total do Orçamento: ')}`;
      mensagem += `%0A%0ASe precisar de algo mais, estamos à disposição!%0AAtenciosamente,%0ASofTech Serviços e Tecnologia`;

      let url = `https://wa.me/55${telefoneCliente}?text=${mensagem}`;
      window.open(url, '_blank');
    });
  }

  // Evento de envio do formulário (E-mail)
  const formOrcamento = document.getElementById('formOrcamento');
  if (formOrcamento) {
    formOrcamento.addEventListener('submit', function(e) {
      e.preventDefault();

      const emailCliente = document.getElementById('email').value;
      const nomeCliente = document.getElementById('cliente').value || "Prezado(a) Cliente";
      const telefoneContato = document.getElementById('telefone').value;

      if (!emailCliente) {
          alert("Por favor, informe o e-mail do cliente para envio.");
          return;
      }

      let corpo = `Olá ${nomeCliente},\n\n`;
      corpo += `É um prazer atendê-lo(a)! Segue abaixo o seu orçamento personalizado:\n\n`;

      corpo += `Serviços:\n`;
      document.querySelectorAll('#tabelaServicos tbody tr:not(.descricao-row)').forEach(tr => {
        const servicoSelect = tr.querySelector('.servico-select');
        if (!servicoSelect) return;
        const servico = servicoSelect.value;

        const quantidadeInput = tr.querySelector('.quantidade');
        const valorUnitarioInput = tr.querySelector('.valor-unitario');
        const totalTd = tr.querySelector('.total-servico');

        const quantidade = quantidadeInput ? quantidadeInput.value : 'N/A';
        const valorUnitario = valorUnitarioInput ? valorUnitarioInput.value : 'N/A';
        const total = totalTd ? totalTd.textContent : 'N/A';

        const descricaoRow = tr.nextElementSibling;
        const descricaoTextarea = descricaoRow && descricaoRow.classList.contains('descricao-row') ? descricaoRow.querySelector('.descricao-servico') : null;
        const descricao = descricaoTextarea ? descricaoTextarea.value : '';
        
        if (servico) { 
            corpo += `- ${servico} | Qtd: ${quantidade} | Unit: R$ ${parseFloat(valorUnitario).toFixed(2).replace('.',',')} | Total: R$ ${parseFloat(total).toFixed(2).replace('.',',')}`;
            if (descricao) corpo += `\n  Observação: ${descricao}`;
            corpo += `\n`;
        }
      });

      corpo += `\n${document.getElementById('valorFinal').textContent.replace('Valor Total: ', 'Valor Total do Orçamento: ')}\n`;
      if (telefoneContato) {
        corpo += `\nSe tiver dúvidas, estamos à disposição pelo telefone: ${telefoneContato}.\n`;
      } else {
        corpo += `\nSe tiver dúvidas, estamos à disposição.\n`;
      }
      corpo += `\nAtenciosamente,\nSofTech Serviços e Tecnologia`;

      const assunto = encodeURIComponent('Orçamento SofTech - ' + nomeCliente);
      const corpoFinal = encodeURIComponent(corpo);

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailCliente)}&su=${assunto}&body=${corpoFinal}`;
      window.open(gmailUrl, '_blank');
    });
  }

  // Listar orçamentos salvos
  listarOrcamentosSalvos();

  // Configurar a primeira linha da tabela (que já existe no HTML)
  const tabelaBody = document.querySelector('#tabelaServicos tbody');
  if (tabelaBody) {
    // Configura a primeira linha da tabela (que já existe no HTML)
    const primeiraLinha = tabelaBody.querySelector('tr:not(.descricao-row)');
    if (primeiraLinha) {
      const select = primeiraLinha.querySelector('.servico-select');
      if (select) {
        popularSelect(select); // Popula o select com os serviços
        select.addEventListener('change', () => atualizarValorUnitario(select)); // Adiciona o evento 'change'
        atualizarValorUnitario(select); // Atualiza o valor unitário com base no serviço selecionado
      }
    }

    // Configura as demais linhas existentes na tabela
    tabelaBody.querySelectorAll('tr:not(.descricao-row)').forEach((serviceRow, index) => {
      const select = serviceRow.querySelector('.servico-select');
      if (select && index > 0) {
        popularSelect(select); // Popula o select com os serviços
        select.addEventListener('change', () => atualizarValorUnitario(select)); // Adiciona o evento 'change'
        atualizarValorUnitario(select); // Atualiza o valor unitário com base no serviço selecionado
      }
    });
  } else {
    console.error("Corpo da tabela de serviços (#tabelaServicos tbody) não encontrado.");
  }

  const removerTodosServicosBtn = document.getElementById('removerTodosServicosBtn');
  if (removerTodosServicosBtn) {
    removerTodosServicosBtn.addEventListener('click', () => {
      const tbody = document.querySelector('#tabelaServicos tbody');
      if (tbody) {
        tbody.innerHTML = ''; // Remove todas as linhas de serviço
        atualizarValorFinal(); // Atualiza o valor total para zero
        alert('Todos os serviços foram removidos.');
      } else {
        console.error("Elemento tbody da tabela de serviços não encontrado.");
      }
    });
  }

  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const chatBody = document.getElementById('chat-body');

  const API_URL = 'http://localhost:3000/chat'; // URL do nosso backend

  // Função para adicionar uma mensagem no chat
  const addMessage = (text, sender) => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', sender);
      messageDiv.textContent = text;
      chatBody.appendChild(messageDiv);
      chatBody.scrollTop = chatBody.scrollHeight; // Rola para a última mensagem
  };

  // Função para enviar a mensagem para o backend
  const sendMessage = async () => {
      const messageText = chatInput.value.trim();
      if (messageText === '') return;

      // Mostra a mensagem do usuário na tela
      addMessage(messageText, 'user');
      chatInput.value = '';

      try {
          const response = await fetch(API_URL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message: messageText }),
          });

          if (!response.ok) {
              throw new Error('A resposta da rede não foi boa.');
          }

          const data = await response.json();
          
          // Mostra a resposta do bot na tela
          addMessage(data.reply, 'bot');

      } catch (error) {
          console.error('Erro ao enviar mensagem:', error);
          addMessage('Oops! Algo deu errado. Tente novamente.', 'bot');
      }
  };

  // Event Listeners
  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          sendMessage();
      }
  });
});

function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'A4'
  });

  // Configuração de margens
  const margemEsquerda = 10;
  const margemDireita = 200; // Largura total da página é 210mm
  const margemTopo = 10;
  const margemRodape = 290; // Altura total da página é 297mm

  // Cabeçalho
  const logo = new Image();
  logo.src = 'Logotipo em GIF.gif'; // Certifique-se de que o caminho está correto
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
    doc.save('orcamento-softech.pdf');
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

    doc.save('orcamento-softech.pdf');
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

  let mensagem = `Olá ${nomeCliente},%0A%0A`;
  mensagem += `É um prazer atendê-lo(a)! Segue abaixo o seu orçamento personalizado:%0A%0A`;

  mensagem += `Serviços:%0A`;
  document.querySelectorAll('#tabelaServicos tbody tr:not(.descricao-row)').forEach(tr => {
      const servicoSelect = tr.querySelector('.servico-select');
      if (!servicoSelect) return; // Pular se o select não for encontrado
      const servico = servicoSelect.value;
      const quantidadeInput = tr.querySelector('.quantidade');
      const valorUnitarioInput = tr.querySelector('.valor-unitario');
      const totalTd = tr.querySelector('.total-servico');

      // Garantir que os elementos existem antes de acessar 'value' ou 'textContent'
      const quantidade = quantidadeInput ? quantidadeInput.value : 'N/A';
      const valorUnitario = valorUnitarioInput ? valorUnitarioInput.value : 'N/A';
      const total = totalTd ? totalTd.textContent : 'N/A';

      const descricaoRow = tr.nextElementSibling;
      const descricaoTextarea = descricaoRow && descricaoRow.classList.contains('descricao-row') ? descricaoRow.querySelector('.descricao-servico') : null;
      const descricao = descricaoTextarea ? descricaoTextarea.value : '';
      
      if (servico) { // Apenas adiciona à mensagem se um serviço foi selecionado
          mensagem += `- ${servico} | Qtd: ${quantidade} | Unit: R$ ${parseFloat(valorUnitario).toFixed(2).replace('.',',')} | Total: R$ ${parseFloat(total).toFixed(2).replace('.',',')}`;
          if (descricao) mensagem += `%0A  Observação: ${encodeURIComponent(descricao)}`;
          mensagem += `%0A`;
      }
  });

  mensagem += `%0A${document.getElementById('valorFinal').textContent.replace('Valor Total: ', 'Valor Total do Orçamento: ')}`;
  mensagem += `%0A%0ASe precisar de algo mais, estamos à disposição!%0AAtenciosamente,%0ASofTech Serviços e Tecnologia`;

  const url = `https://wa.me/55${telefoneCliente}?text=${mensagem}`;
  window.open(url, '_blank');
}

const formOrcamento = document.getElementById('formOrcamento');
if (formOrcamento) {
  formOrcamento.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailCliente = document.getElementById('email').value;
    const nomeCliente = document.getElementById('cliente').value || "Prezado(a) Cliente";

    let corpo = `Olá ${nomeCliente},\n\n`;
    corpo += `É um prazer atendê-lo(a)! Segue abaixo o seu orçamento personalizado:\n\n`;

    document.querySelectorAll('#tabelaServicos tbody tr:not(.descricao-row)').forEach(tr => {
      const servicoSelect = tr.querySelector('.servico-select');
      if (servicoSelect && servicoSelect.value) {
        const servico = servicoSelect.options[servicoSelect.selectedIndex].text;
        const quantidade = tr.querySelector('.quantidade').value;
        const valorUnitario = tr.querySelector('.valor-unitario').value;
        const total = tr.querySelector('.total-servico').textContent;
        corpo += `- ${servico} | Qtd: ${quantidade} | Unit: R$ ${valorUnitario} | Total: R$ ${total}\n`;
      }
    });

    corpo += `\n${document.getElementById('valorFinal').textContent.replace('Valor Total: ', 'Valor Total do Orçamento: ')}`;
    corpo += `\n\nSe precisar de algo mais, estamos à disposição!\nAtenciosamente,\nSofTech Serviços e Tecnologia`;

    const assunto = encodeURIComponent('Orçamento SofTech - ' + nomeCliente);
    const corpoFinal = encodeURIComponent(corpo);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailCliente)}&su=${assunto}&body=${corpoFinal}`;
    window.open(gmailUrl, '_blank');
  });
}