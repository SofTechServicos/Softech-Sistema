module.exports = {
  empresa: {
    nome: "SofTech Serviços e Tecnologia",
    telefone: "(93) 98115-4627",
    email: "softechservicosetecnologia@gmail.com",
    whatsapp: "https://wa.me/5593981154627"
  },
  servicos: [
    // =========================================================================
    // CATEGORIA: SERVIÇOS RÁPIDOS E ESSENCIAIS (FOCO: FLUXO DE CAIXA RÁPIDO)
    // =========================================================================
    { 
        nome: "Auxílio em Serviços Públicos Online", 
        valor: 35.00, 
        descricao: "Assistência completa para agendamentos, emissão de certidões, documentos e navegação em portais do governo (Gov.br, INSS, Detran).", 
        categoria: "servicos_essenciais" 
    },
    { 
        nome: "Elaboração e Atualização de Currículo", 
        valor: 45.00, 
        descricao: "Criação de um currículo do zero ou modernização do atual, com layout profissional para destacar suas qualificações.", 
        categoria: "servicos_essenciais" 
    },
    { 
        nome: "Formatação de Trabalhos (Normas ABNT)", 
        valor: 50.00, 
        descricao: "Adequação profissional de trabalhos escolares e acadêmicos às normas da ABNT. Valor inicial para trabalhos de até 15 páginas.", 
        categoria: "servicos_essenciais" 
    },
    { 
        nome: "Criação de Documentos Simples", 
        valor: 40.00, 
        descricao: "Redação de declarações, requerimentos e contratos básicos (prestação de serviço, aluguel).", 
        categoria: "servicos_essenciais" 
    },
    { 
        nome: "Serviços de Escritório Digital", 
        valor: 20.00, 
        descricao: "Conversão de arquivos (Word, PDF, JPG), digitalização de documentos, criação de QR Codes e envio por e-mail.", 
        categoria: "servicos_essenciais" 
    },
    
    // =================================================================================
    // CATEGORIA: SUPORTE TÉCNICO E MANUTENÇÃO (FOCO: CONSTRUÇÃO DE CONFIANÇA)
    // =================================================================================
    { 
        nome: "Diagnóstico Técnico Completo", 
        valor: 70.00, 
        descricao: "Identificação precisa de problemas de hardware ou software. O valor é 100% abatido no custo do conserto, se aprovado.", 
        categoria: "suporte_tecnico" 
    },
    { 
        nome: "Formatação com Backup e Instalação de Programas", 
        valor: 150.00, 
        descricao: "Sistema reinstalado, otimizado, com backup seguro (até 20GB) e instalação do pacote de programas essenciais.", 
        categoria: "suporte_tecnico" 
    },
    { 
        nome: "Pacote de Otimização e Limpeza de Sistema", 
        valor: 100.00, 
        descricao: "Remoção de vírus/malwares, limpeza de arquivos, atualização de drivers e otimização geral para máxima performance.", 
        categoria: "suporte_tecnico" 
    },
    { 
        nome: "Limpeza Física Interna (PCs e Notebooks)", 
        valor: 120.00, 
        descricao: "Limpeza detalhada de componentes e troca de pasta térmica de alta qualidade para prevenir superaquecimento.", 
        categoria: "suporte_tecnico" 
    },
    { 
        nome: "Instalação de Componentes (Upgrade de Hardware)", 
        valor: 80.00, 
        descricao: "Mão de obra para instalação e configuração de Memória RAM, SSD, Fontes, etc. (Peças não inclusas).", 
        categoria: "suporte_tecnico" 
    },
    { 
        nome: "Suporte Técnico Remoto", 
        valor: 80.00, 
        descricao: "Solução de problemas de software, configurações e dúvidas via acesso remoto. (Cobrado por sessão de até 1h).", 
        categoria: "suporte_tecnico" 
    },
    
    // =================================================================================
    // CATEGORIA: SOLUÇÕES PARA NEGÓCIOS (FOCO: AUMENTAR O TICKET MÉDIO)
    // =================================================================================
    { 
        nome: "Pacote 'PC Novo Pronto para Trabalhar'", 
        valor: 200.00, 
        descricao: "Configuração completa de computadores novos: Sistema, drivers, antivírus, pacote Office e programas para seu negócio.", 
        categoria: "solucoes_negocios" 
    },
    { 
        nome: "Criação de Planilhas Personalizadas", 
        valor: 120.00, 
        descricao: "Desenvolvimento de planilhas inteligentes para controle financeiro, fluxo de caixa, estoque e gestão de clientes. (Valor a partir de).", 
        categoria: "solucoes_negocios" 
    },
    { 
        nome: "Configuração de Rotina de Backup em Nuvem", 
        valor: 90.00, 
        descricao: "Proteja seus dados! Implementação de rotina de backup automático e seguro no Google Drive ou OneDrive.", 
        categoria: "solucoes_negocios" 
    },
    { 
        nome: "Consultoria para Compra de Equipamentos", 
        valor: 80.00, 
        descricao: "Análise de suas necessidades para indicar o computador, notebook ou periférico com o melhor custo-benefício.", 
        categoria: "solucoes_negocios" 
    },

    // ===================================================================================
    // CATEGORIA: PRESENÇA DIGITAL E DESENVOLVIMENTO (FOCO: VENDA CRUZADA E LONGO PRAZO)
    // ===================================================================================
    { 
        nome: "Pacote 'Presença Online Essencial'", 
        valor: 150.00, 
        descricao: "Criamos e configuramos seu Google Meu Negócio, perfil comercial no Instagram e e-mail profissional.", 
        categoria: "presenca_digital" 
    },
    { 
        nome: "Criação de Landing Page (Página de Vendas)", 
        valor: 450.00, 
        descricao: "Desenvolvimento de uma página única e otimizada para celular, focada em divulgar um produto, serviço ou evento. (Valor a partir de).", 
        categoria: "presenca_digital" 
    },
    { 
        nome: "Criação de Site Institucional", 
        valor: 750.00, 
        descricao: "Desenvolvimento de um site profissional com até 3 páginas (Início, Sobre, Contato) para apresentar sua empresa na internet. (Valor a partir de).", 
        categoria: "presenca_digital" 
    },
    { 
        nome: "Manutenção e Atualização de Site", 
        valor: 100.00, 
        descricao: "Serviço de atualização de conteúdo, correções de segurança e melhorias em sites existentes. (Valor por hora).", 
        categoria: "presenca_digital" 
    },
    { 
        nome: "Desenvolvimento de Software Sob Medida", 
        valor: 5000.00, 
        descricao: "Criação de sistemas e soluções personalizadas para otimizar processos complexos de empresas. (Valor sob orçamento).", 
        categoria: "presenca_digital" 
    }
  ],
  contexto: `
  Você é um assistente de triagem especialista da SofTech. Sua ÚNICA função é guiar o usuário por um menu de opções para identificar o serviço correto. Você NUNCA deve dar respostas longas ou diretas. Sua resposta DEVE sempre seguir o formato de um menu.

  **FLUXO OBRIGATÓRIO DA CONVERSA:**

  1.  **Análise Inicial:** Analise a mensagem do usuário.
  2.  **Identifique a Categoria:** Com base na mensagem, identifique a categoria de serviço mais provável (Suporte Técnico, Desenvolvimento Web ou Serviços Digitais).
  3.  **Apresente Opções:** Apresente ao usuário uma LISTA NUMERADA com os 2 ou 3 serviços mais relevantes daquela categoria.
      *   **CRÍTICO:** NÃO inclua descrições longas nem PREÇOS na lista de opções. Apenas os nomes dos serviços.
      *   Sua resposta DEVE terminar com uma pergunta como: "Qual destas opções descreve melhor o que você precisa? Por favor, responda com o número."

  4.  **Aguarde a Escolha:** Após o usuário responder com um número, você fornecerá a descrição detalhada e perguntará se ele deseja saber o preço.

  **EXEMPLO DE INTERAÇÃO PERFEITA:**
  > **Usuário:** "meu pc não quer ligar, fica numa tela preta"
  > **Sua Resposta (IA):** "Entendo o problema. Parece que você precisa de um suporte técnico. Qual das opções abaixo se encaixa melhor na sua necessidade?\n\n1. Diagnóstico Avançado de Hardware\n2. Remoção de Vírus e Malware\n3. Limpeza Física Interna\n\nPor favor, responda com o número da opção."

  > **Usuário:** "1"
  > **Sua Resposta (IA):** "Ótima escolha. O serviço de Diagnóstico Avançado de Hardware consiste na identificação precisa de componentes defeituosos. O valor pago pelo diagnóstico é abatido no custo do conserto. Gostaria de saber o valor deste serviço?"

  **REGRAS ADICIONAIS:**
  - **Contato:** Se o usuário pedir contato, forneça TODOS os canais: telefone: "(93) 98115-4627", Email: "softechservicosetecnologia@gmail.com", Whatsapp: "https://wa.me/5593981154627".
  - **Pergunta Geral:** Se perguntarem "o que vocês fazem?", resuma as categorias e pergunte em qual delas o usuário tem interesse para que você possa mostrar as opções.`
};