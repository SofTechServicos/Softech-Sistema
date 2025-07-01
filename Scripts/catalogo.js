document.addEventListener('DOMContentLoaded', () => {
  // A variável 'servicos' agora vem do arquivo 'Scripts/servicos.js'
  if (typeof servicos === 'undefined') {
    console.error('A lista de serviços não foi carregada. Verifique se o arquivo "servicos.js" está incluído corretamente.');
    return;
  }

  const catalogoContainer = document.querySelector('.catalogo-container');
  if (!catalogoContainer) {
    console.error('O contêiner do catálogo não foi encontrado.');
    return;
  }
  
  // Limpa o container para garantir que não haja conteúdo duplicado
  catalogoContainer.innerHTML = '';

  const categorias = [...new Set(servicos.map(s => s.categoria))];

  categorias.forEach(categoria => {
    // Cria o título da categoria
    const h2 = document.createElement('h2');
    h2.textContent = categoria;
    catalogoContainer.appendChild(h2);

    // Cria o grid para os serviços da categoria
    const grid = document.createElement('div');
    grid.className = 'catalogo-grid';
    catalogoContainer.appendChild(grid);

    // Filtra e adiciona os serviços da categoria ao grid
    servicos
      .filter(s => s.categoria === categoria)
      .forEach(servico => {
        const div = document.createElement('div');
        div.className = 'catalogo-item';
        div.innerHTML = `
          <img src="${servico.imagem}" alt="${servico.nome}" class="catalogo-imagem">
          <div class="catalogo-item-content">
            <h3>${servico.nome}</h3>
            <p>${servico.descricao}</p>
            <span>R$ ${servico.valor ? servico.valor.toFixed(2).replace('.', ',') : 'Sob consulta'}</span>
          </div>
        `;
        grid.appendChild(div);
      });
  });
});