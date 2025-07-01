// A variável 'servicos' agora vem do arquivo 'Scripts/servicos.js'

const LOCAL_STORAGE_KEY_GERADOR = 'orcamentosSofTech';

// Determina quais serviços têm preço editável (valor nulo)
const servicosEditaveis = servicos
  .filter(s => s.valor === null)
  .map(s => s.nome);

/**
 * Agrupa os serviços pela sua categoria.
 * @returns {Object} Um objeto onde as chaves são as categorias e os valores são arrays de serviços.
 */
function agruparServicosPorCategoria() {
  return servicos.reduce((acc, servico) => {
    const categoria = servico.categoria;
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(servico);
    return acc;
  }, {});
}

/**
 * Popula um elemento <select> com os serviços, agrupados por categoria.
 * @param {HTMLSelectElement} select - O elemento select a ser populado.
 */
function popularSelect(select) {
  const servicosAgrupados = agruparServicosPorCategoria();
  select.innerHTML = '<option value="">Selecione um Serviço</option>';

  for (const categoria in servicosAgrupados) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = categoria;
    servicosAgrupados[categoria].forEach(servico => {
      const option = document.createElement('option');
      option.value = servico.nome;
      option.textContent = servico.nome;
      optgroup.appendChild(option);
    });
    select.appendChild(optgroup);
  }
}

/**
 * Adiciona uma nova linha de serviço à tabela de orçamentos.
 */
function adicionarServico() {
  const tbody = document.querySelector('#tabelaServicos tbody');
  const linhaServico = document.createElement('tr');
  linhaServico.innerHTML = `
    <td class="categoria-servico"></td>
    <td><select class="servico-select"></select></td>
    <td><input type="number" class="quantidade" min="1" value="1"></td>
    <td><input type="number" class="valor-unitario" min="0" step="0.01" value="0.00" readonly></td>
    <td class="total-servico">0.00</td>
    <td><button type="button" class="remover-servico btn btn-danger btn-sm">Remover</button></td>
  `;

  const linhaDescricao = document.createElement('tr');
  linhaDescricao.classList.add('descricao-row');
  linhaDescricao.innerHTML = `<td colspan="6"><textarea class="descricao-servico" placeholder="Descrição adicional para este serviço"></textarea></td>`;

  tbody.appendChild(linhaServico);
  tbody.appendChild(linhaDescricao);

  setupRowEventListeners(linhaServico, linhaDescricao);

  linhaServico.classList.add('highlight-new-row');
  setTimeout(() => linhaServico.classList.remove('highlight-new-row'), 700);
  linhaServico.querySelector('.servico-select').focus();
}

/**
 * Atualiza os campos da linha (categoria, valor, descrição) com base no serviço selecionado.
 * @param {HTMLSelectElement} selectElement - O elemento select que foi alterado.
 */
function atualizarCamposDaLinha(selectElement) {
  const serviceRow = selectElement.closest('tr');
  const valorUnitarioInput = serviceRow.querySelector('.valor-unitario');
  const categoriaTd = serviceRow.querySelector('.categoria-servico');
  const descricaoRow = serviceRow.nextElementSibling;
  const descricaoTextarea = descricaoRow ? descricaoRow.querySelector('.descricao-servico') : null;
  
  const servicoSelecionadoNome = selectElement.value;
  const servico = servicos.find(s => s.nome === servicoSelecionadoNome);

  if (servico) {
    valorUnitarioInput.value = servico.valor ? servico.valor.toFixed(2) : "0.00";
    valorUnitarioInput.readOnly = !servicosEditaveis.includes(servico.nome);
    categoriaTd.textContent = servico.categoria;
    if (descricaoTextarea) {
      descricaoTextarea.value = servico.descricao || '';
    }
  } else {
    valorUnitarioInput.value = "0.00";
    valorUnitarioInput.readOnly = true;
    categoriaTd.textContent = '';
    if (descricaoTextarea) {
      descricaoTextarea.value = '';
    }
  }
  calcularTotalServico(serviceRow);
}

/**
 * Configura os event listeners para uma nova linha de serviço.
 * @param {HTMLTableRowElement} serviceRow - A linha principal do serviço.
 * @param {HTMLTableRowElement} descriptionRow - A linha da descrição.
 */
function setupRowEventListeners(serviceRow, descriptionRow) {
  const select = serviceRow.querySelector('.servico-select');
  const quantidade = serviceRow.querySelector('.quantidade');
  const valorUnitario = serviceRow.querySelector('.valor-unitario');
  const removerBtn = serviceRow.querySelector('.remover-servico');

  popularSelect(select);
  valorUnitario.readOnly = true;

  select.addEventListener('change', () => atualizarCamposDaLinha(select));
  quantidade.addEventListener('input', () => calcularTotalServico(serviceRow));
  valorUnitario.addEventListener('input', () => calcularTotalServico(serviceRow));
  removerBtn.addEventListener('click', () => {
    serviceRow.remove();
    if (descriptionRow) descriptionRow.remove();
    atualizarValorFinal();
  });
}

/**
 * Calcula o valor total para uma linha de serviço.
 * @param {HTMLTableRowElement} serviceRowElement - A linha do serviço a ser calculada.
 */
function calcularTotalServico(serviceRowElement) {
  const valorUnitarioInput = serviceRowElement.querySelector('.valor-unitario');
  const quantidadeInput = serviceRowElement.querySelector('.quantidade');
  const totalServicoTd = serviceRowElement.querySelector('.total-servico');

  const valorUnitario = parseFloat(valorUnitarioInput.value) || 0;
  const quantidade = parseInt(quantidadeInput.value) || 0;
  const total = valorUnitario * quantidade;

  totalServicoTd.textContent = total.toFixed(2);
  atualizarValorFinal();
}

/**
 * Atualiza o valor total do orçamento somando os totais de cada linha.
 */
function atualizarValorFinal() {
  let total = 0;
  document.querySelectorAll('.total-servico').forEach(td => {
    total += parseFloat(td.textContent) || 0;
  });
  document.getElementById('valorFinal').textContent = `Valor Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

/**
 * Salva o orçamento atual no Local Storage.
 */
function salvarOrcamento() {
  const linhas = [];
  document.querySelectorAll('#tabelaServicos tbody tr:not(.descricao-row)').forEach(tr => {
    const servicoSelect = tr.querySelector('.servico-select');
    if (servicoSelect && servicoSelect.value) {
      const descricaoRow = tr.nextElementSibling;
      const descricao = descricaoRow ? descricaoRow.querySelector('.descricao-servico').value : '';
      linhas.push({
        servico: servicoSelect.value,
        quantidade: tr.querySelector('.quantidade').value,
        valorUnitario: tr.querySelector('.valor-unitario').value,
        descricao: descricao
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
  listarOrcamentosSalvos();
}

/**
 * Carrega um orçamento salvo do Local Storage para a tabela.
 * @param {string} orcamentoId - O ID (timestamp) do orçamento a ser carregado.
 */
function carregarOrcamentoSalvo(orcamentoId) {
    const orcamentos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_GERADOR) || '[]');
    const orc = orcamentos.find(o => o.data === orcamentoId);
    if (!orc) {
        alert("Erro: Orçamento não encontrado.");
        return;
    }

    document.getElementById('formOrcamento').reset();
    const tbody = document.querySelector('#tabelaServicos tbody');
    tbody.innerHTML = '';

    document.getElementById('cliente').value = orc.cliente || '';
    document.getElementById('email').value = orc.email || '';
    document.getElementById('telefone').value = orc.telefone || '';

    orc.linhas.forEach(linha => {
        adicionarServico();
        const trsServico = tbody.querySelectorAll('tr:not(.descricao-row)');
        const trServico = trsServico[trsServico.length - 1];
        
        const select = trServico.querySelector('.servico-select');
        select.value = linha.servico;
        select.dispatchEvent(new Event('change'));

        trServico.querySelector('.quantidade').value = linha.quantidade;
        
        if (servicosEditaveis.includes(linha.servico)) {
            trServico.querySelector('.valor-unitario').value = parseFloat(linha.valorUnitario).toFixed(2);
        }

        const trDescricao = trServico.nextElementSibling;
        if (trDescricao) {
            trDescricao.querySelector('.descricao-servico').value = linha.descricao || '';
        }
        
        calcularTotalServico(trServico);
    });

    atualizarValorFinal();
    alert('Orçamento carregado com sucesso!');
}

/**
 * Renderiza a lista de orçamentos salvos na página.
 */
function listarOrcamentosSalvos() {
  const container = document.getElementById('listaOrcamentosSalvos');
  container.innerHTML = '';

  const orcamentos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_GERADOR) || '[]');

  if (orcamentos.length === 0) {
    container.innerHTML = '<p class="orcamentos-salvos-vazio">Nenhum orçamento salvo encontrado.</p>';
    return;
  }

  const h3 = document.createElement('h3');
  h3.textContent = 'Orçamentos Salvos';
  container.appendChild(h3);

  const apagarTodosBtn = document.createElement('button');
  apagarTodosBtn.type = 'button';
  apagarTodosBtn.className = 'btn btn-danger btn-sm';
  apagarTodosBtn.textContent = 'Apagar Todos';
  apagarTodosBtn.style.marginBottom = '1rem';
  apagarTodosBtn.onclick = apagarTodosOrcamentos;
  container.appendChild(apagarTodosBtn);

  const ul = document.createElement('ul');
  ul.className = 'orcamentos-salvos-list';
  container.appendChild(ul);

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
    carregarBtn.onclick = () => carregarOrcamentoSalvo(orc.data);

    const excluirBtn = document.createElement('button');
    excluirBtn.type = 'button';
    excluirBtn.className = 'btn btn-danger btn-sm';
    excluirBtn.textContent = 'Excluir';
    excluirBtn.onclick = () => excluirOrcamentoSalvo(orc.data);

    btnsDiv.appendChild(carregarBtn);
    btnsDiv.appendChild(excluirBtn);
    li.appendChild(infoDiv);
    li.appendChild(btnsDiv);
    ul.appendChild(li);
  });
}

/**
 * Exclui um orçamento específico do Local Storage.
 * @param {string} orcamentoId - O ID do orçamento a ser excluído.
 */
function excluirOrcamentoSalvo(orcamentoId) {
  if (!confirm('Tem certeza que deseja excluir este orçamento?')) return;
  let orcamentos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_GERADOR) || '[]');
  orcamentos = orcamentos.filter(o => o.data !== orcamentoId);
  localStorage.setItem(LOCAL_STORAGE_KEY_GERADOR, JSON.stringify(orcamentos));
  listarOrcamentosSalvos();
}

/**
 * Exclui todos os orçamentos do Local Storage.
 */
function apagarTodosOrcamentos() {
  if (confirm('Tem certeza que deseja apagar TODOS os orçamentos salvos? Esta ação não pode ser desfeita.')) {
    localStorage.removeItem(LOCAL_STORAGE_KEY_GERADOR);
    listarOrcamentosSalvos();
    alert('Todos os orçamentos salvos foram apagados.');
  }
}

// Inicialização e configuração dos event listeners principais
document.addEventListener('DOMContentLoaded', () => {
  // Verifica se a lista de serviços foi carregada
  if (typeof servicos === 'undefined') {
    console.error('A lista de serviços não foi carregada. Verifique se o arquivo "servicos.js" está incluído corretamente.');
    alert('Erro crítico: A lista de serviços não pôde ser carregada. A página pode não funcionar corretamente.');
    return;
  }

  const primeiraLinha = document.querySelector('#tabelaServicos tbody tr:not(.descricao-row)');
  if (primeiraLinha) {
    setupRowEventListeners(primeiraLinha, primeiraLinha.nextElementSibling);
  }

  document.getElementById('adicionarServicoBtn').addEventListener('click', adicionarServico);
  document.getElementById('salvarOrcamentoBtn').addEventListener('click', salvarOrcamento);
  document.getElementById('removerTodosServicosBtn').addEventListener('click', () => {
    if (confirm('Deseja remover todos os serviços da tabela?')) {
        const tbody = document.querySelector('#tabelaServicos tbody');
        tbody.innerHTML = '';
        adicionarServico(); // Adiciona uma linha em branco para começar
        atualizarValorFinal();
    }
  });

  listarOrcamentosSalvos();
});