module.exports = {
  empresa: {
    nome: "SofTech Serviços e Tecnologia",
    telefone: "(93) 98115-4627",
    email: "softechservicosetecnologia@gmail.com",
    whatsapp: "https://wa.me/5593981154627"
  },
  servicos: [
    // ... (toda a sua lista de serviços permanece exatamente igual, não precisa mexer aqui)
    // === Categoria: Suporte Técnico e Manutenção de Computadores ===
    { nome: "Instalação de sistema operacional (Windows, Linux)", valor: 250.00, descricao: "Instalação limpa e configuração de sistemas operacionais, com drivers atualizados.", categoria: "suporte_tecnico" },
    { nome: "Formatação de Computador (com Backup)", valor: 50.00, descricao: "Formatação completa, reinstalação do sistema e backup de até 10GB de arquivos.", categoria: "suporte_tecnico" },
    { nome: "Limpeza Física Interna (PCs e Notebooks)", valor: 120.00, descricao: "Limpeza completa de componentes internos para prevenir superaquecimento e troca de pasta térmica.", categoria: "suporte_tecnico" },
    { nome: "Remoção de Vírus e Malware", valor: 40.00, descricao: "Verificação completa do sistema, remoção de ameaças e instalação de proteção básica.", categoria: "suporte_tecnico" },
    { nome: "Upgrades de Hardware (Instalação de RAM/SSD)", valor: 100.00, descricao: "Instalação de componentes como Memória RAM ou SSD (valor referente à mão de obra, peças não inclusas).", categoria: "suporte_tecnico" },
    { nome: "Diagnóstico Avançado de Hardware", valor: 70.00, descricao: "Identificação precisa de componentes defeituosos. O valor é abatido no custo do conserto.", categoria: "suporte_tecnico" },
    { nome: "Pacote 'PC Novo Pronto para Usar'", valor: 280.00, descricao: "Configuração completa para PCs novos: SO, drivers, antivírus e pacote de programas essenciais.", categoria: "suporte_tecnico" },
    { nome: "Configuração de rede doméstica/pequena empresa", valor: 200.00, descricao: "Instalação e configuração de roteadores, repetidores e dispositivos em rede.", categoria: "suporte_tecnico" },
    { nome: "Backup em nuvem (configuração e instrução)", valor: 80.00, descricao: "Configuração de rotina de backup automático e seguro em serviços de nuvem como Google Drive ou OneDrive.", categoria: "suporte_tecnico" },
    // === Categoria: Desenvolvimento e Presença Digital ===
    { nome: "Criação de sites simples para empresas/comércio local", valor: 300.00, descricao: "Desenvolvimento de sites institucionais responsivos com até 3 páginas (Ex: Home, Sobre, Contato).", categoria: "desenvolvimento_web" },
    { nome: "Criação de landing pages promocionais", valor: 200.00, descricao: "Criação de página única focada em conversão para um produto, serviço ou evento específico.", categoria: "desenvolvimento_web" },
    { nome: "Atualização/manutenção de site existente", valor: 150.00, descricao: "Serviço de atualização de conteúdo, plugins e correções de segurança em sites (valor por hora ou pacote).", categoria: "desenvolvimento_web" },
    { nome: "Criação de contas profissionais (Google, e-mail, redes sociais)", valor: 50.00, descricao: "Criação e configuração inicial de perfis comerciais e e-mails profissionais.", categoria: "desenvolvimento_web" },
    // === Categoria: Serviços Digitais e Consultoria ===
    { nome: "Formatação de documentos (TCC, monografias, relatórios - Normas ABNT)", valor: 20.00, descricao: "Adequação profissional de trabalhos acadêmicos e corporativos às normas da ABNT (valor por hora).", categoria: "servicos_digitais" },
    { nome: "Elaboração de currículo personalizado", valor: 15.00, descricao: "Criação ou modernização de currículos com design profissional e foco em resultados.", categoria: "servicos_digitais" },
    { nome: "Elaboração de Contratos Simples", valor: 20.00, descricao: "Redação de contratos básicos para prestação de serviços, aluguel, etc.", categoria: "servicos_digitais" },
    { nome: "Suporte técnico remoto (por sessão)", valor: 100.00, descricao: "Solução de problemas de software, configurações e dúvidas via acesso remoto.", categoria: "servicos_digitais" },
    { nome: "Suporte em serviços públicos online (Gov.br, INSS, etc.)", valor: 10.00, descricao: "Auxílio para emissão de documentos, agendamentos e navegação em portais do governo.", categoria: "servicos_digitais" },
    { nome: "Auxílio em serviços do Detran (emissão, agendamentos, etc.)", valor: 15.00, descricao: "Assistência para resolver pendências e realizar serviços online junto ao Detran.", categoria: "servicos_digitais" },
    { nome: "Aulas Básicas de Informática (por hora)", valor: 50.00, descricao: "Aulas particulares para iniciantes sobre uso do computador, internet ou Pacote Office.", categoria: "servicos_digitais" },
    { nome: "Consultoria para Compra de Equipamentos", valor: 60.00, descricao: "Análise de necessidades e indicação do PC, notebook ou periférico com melhor custo-benefício.", categoria: "servicos_digitais" },
    { nome: "Licenciamento de software (auxílio e regularização)", valor: 300.00, descricao: "Consultoria e auxílio na aquisição de licenças de softwares para garantir a regularização.", categoria: "servicos_digitais" },
    { nome: "Redação de documentos simples (declarações, requerimentos etc.)", valor: 10.00, descricao: "Criação rápida de textos para documentos do dia a dia.", categoria: "servicos_digitais" },
    { nome: "Suporte Técnico", valor: 150.00, descricao: "Atendimento remoto para resolução de problemas em sistemas." },
    { nome: "Desenvolvimento de Software", valor: 2000.00, descricao: "Criação de sistemas personalizados conforme a necessidade do cliente." }
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