document.addEventListener('DOMContentLoaded', () => {
    // --- DADOS MOCK (simulados) ---
    // No futuro, estes dados virão de um banco de dados ou de um arquivo de configuração.
    const todosModelos = [
        // Exemplo de como um modelo seria estruturado:
        // {
        //     id: 'plan-fin-01',
        //     nome: 'Planilha de Controle Financeiro Pessoal',
        //     categoria: 'Planilhas',
        //     descricao: 'Organize suas finanças, controle gastos e planeje seu futuro com esta planilha completa e fácil de usar.',
        //     imagem: 'images/modelo_planilha.png',
        //     preco_individual: 29.90,
        //     preco_combo: 79.90, // Preço com assistência
        //     payment_link_individual: 'URL_PAGAMENTO_INDIVIDUAL',
        //     payment_link_combo: 'URL_PAGAMENTO_COMBO'
        // }
    ];

    const container = document.getElementById('modelos-grid-container');
    const searchInput = document.getElementById('search-modelos-input');

    function renderizarModelos(modelos) {
        if (!container) return;
        container.innerHTML = ''; // Limpa o container

        if (modelos.length === 0) {
            container.innerHTML = '<p>Nenhum modelo encontrado com os critérios de busca.</p>';
            if (searchInput.value === '') {
                 container.innerHTML = '<p>Nenhum modelo digital disponível no momento. Volte em breve!</p>';
            }
            return;
        }

        const modelosAgrupados = modelos.reduce((acc, modelo) => {
            if (!acc[modelo.categoria]) {
                acc[modelo.categoria] = [];
            }
            acc[modelo.categoria].push(modelo);
            return acc;
        }, {});

        for (const categoria in modelosAgrupados) {
            const categoriaDiv = document.createElement('div');
            categoriaDiv.className = 'modelo-categoria';
            categoriaDiv.innerHTML = `<h3>${categoria}</h3>`;

            const gridDiv = document.createElement('div');
            gridDiv.className = 'categoria-grid';

            modelosAgrupados[categoria].forEach(modelo => {
                const card = document.createElement('div');
                card.className = 'modelo-card';
                card.innerHTML = `
                    <img src="${modelo.imagem}" alt="${modelo.nome}" class="modelo-imagem">
                    <div class="modelo-card-content">
                        <div class="modelo-card-header">
                            <h4>${modelo.nome}</h4>
                            <button class="btn-info" title="Clique para ver a descrição">i</button>
                        </div>
                        <div class="modelo-card-description">
                            <p>${modelo.descricao}</p>
                        </div>
                    </div>
                    <div class="precos">
                        <strong>R$ ${modelo.preco_individual.toFixed(2).replace('.', ',')}</strong> - Apenas o Modelo<br>
                        <span class="combo-info">ou <strong>R$ ${modelo.preco_combo.toFixed(2).replace('.', ',')}</strong> com 1h de assistência para preenchimento.</span>
                    </div>
                    <div class="botoes-compra">
                        <button class="btn-comprar" data-link="${modelo.payment_link_individual}">Comprar Modelo</button>
                        <button class="btn-comprar-combo" data-link="${modelo.payment_link_combo}">Comprar Combo</button>
                    </div>
                `;
                gridDiv.appendChild(card);
            });
            categoriaDiv.appendChild(gridDiv);
            container.appendChild(categoriaDiv);
        }
    }

    // Event listener para a busca
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase();
            const modelosFiltrados = todosModelos.filter(modelo => 
                modelo.nome.toLowerCase().includes(termo) || 
                modelo.descricao.toLowerCase().includes(termo)
            );
            renderizarModelos(modelosFiltrados);
        });
    }

    // Event listener para os botões de informação (i)
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-info')) {
            const header = e.target.closest('.modelo-card-header');
            const description = header.nextElementSibling;
            description.classList.toggle('show');
        }
        if (e.target.classList.contains('btn-comprar') || e.target.classList.contains('btn-comprar-combo')) {
            alert('A funcionalidade de pagamento ainda não foi implementada. Este é um passo futuro que requer integração com um sistema de pagamento seguro.');
            const paymentLink = e.target.dataset.link;
            // Em um cenário real, aqui ocorreria o redirecionamento:
            // window.location.href = paymentLink;
            console.log('Link de pagamento simulado:', paymentLink);
        }
    });

    // Renderização inicial
    renderizarModelos(todosModelos);
});