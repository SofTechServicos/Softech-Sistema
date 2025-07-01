// Unica fonte de verdade para a lista de serviços
const servicos = [
  // =========================================================================
  // CATEGORIA: SERVIÇOS ESSENCIAIS E DE ESCRITÓRIO
  // =========================================================================
  {
    nome: "Auxílio em Serviços Públicos Online",
    valor: 40.00,
    descricao: "Assistência completa e segura para agendamentos, emissões e navegação em portais do governo (Gov.br, INSS, Detran, etc.).",
    categoria: "Serviços Essenciais e de Escritório",
    imagem: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&w=400"
  },
  {
    nome: "Suporte para Serviços Bancários Online",
    valor: 35.00,
    descricao: "Auxílio seguro para realizar transações, pagamentos de contas e outras operações em aplicativos e sites de bancos.",
    categoria: "Serviços Essenciais e de Escritório",
    imagem: "https://images.pexels.com/photos/4386433/pexels-photo-4386433.jpeg?auto=compress&w=400"
  },
  {
    nome: "Elaboração e Atualização de Currículo",
    valor: 45.00,
    descricao: "Criação ou modernização do seu currículo com um design profissional que destaca suas qualificações para o mercado de Paragominas.",
    categoria: "Serviços Essenciais e de Escritório",
    imagem: "https://images.pexels.com/photos/5989925/pexels-photo-5989925.jpeg?auto=compress&w=400"
  },
  {
    nome: "Formatação de Trabalhos (Normas ABNT)",
    valor: 50.00,
    descricao: "Garantimos a adequação completa do seu trabalho acadêmico ou relatório às normas da ABNT. (Valor a partir de, para até 15 páginas).",
    categoria: "Serviços Essenciais e de Escritório",
    imagem: "https://images.pexels.com/photos/9572495/pexels-photo-9572495.jpeg?auto=compress&w=400"
  },
  {
    nome: "Criação de Documentos e Contratos Simples",
    valor: 40.00,
    descricao: "Redação clara e profissional de declarações, requerimentos e contratos básicos para prestação de serviços, aluguel, etc.",
    categoria: "Serviços Essenciais e de Escritório",
    imagem: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&w=400"
  },
  
  // =========================================================================
  // CATEGORIA: MANUTENÇÃO E SUPORTE TÉCNICO
  // =========================================================================
  {
    nome: "Diagnóstico Técnico Completo",
    valor: 70.00,
    descricao: "Identificação precisa de qualquer problema em seu PC, notebook ou impressora. O valor é 100% abatido no custo do conserto, se aprovado.",
    categoria: "Manutenção e Suporte Técnico",
    imagem: "https://images.pexels.com/photos/4491448/pexels-photo-4491448.jpeg?auto=compress&w=400"
  },
  {
    nome: "Formatação com Backup e Programas Essenciais",
    valor: 150.00,
    descricao: "Deixamos seu computador como novo: sistema reinstalado, otimizado, com backup seguro de seus arquivos e pacote de programas essenciais.",
    categoria: "Manutenção e Suporte Técnico",
    imagem: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&w=400"
  },
  {
    nome: "Pacote 'Softech Turbo': Otimização e Remoção de Vírus",
    valor: 100.00,
    descricao: "Nossa solução completa para lentidão. Inclui remoção de vírus e malwares, limpeza de arquivos e otimização do sistema para máxima performance.",
    categoria: "Manutenção e Suporte Técnico",
    imagem: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&w=400"
  },
  {
    nome: "Limpeza Física Interna Completa (PCs e Notebooks)",
    valor: 120.00,
    descricao: "Manutenção preventiva essencial. Inclui limpeza detalhada de componentes e a troca da pasta térmica para evitar superaquecimento.",
    categoria: "Manutenção e Suporte Técnico",
    imagem: "https://images.pexels.com/photos/4316/technology-computer-chips-gigabyte-4316.jpeg?auto=compress&w=400"
  },
  {
    nome: "Manutenção Preventiva em Impressoras",
    valor: 150.00,
    descricao: "Limpeza profissional e ajustes técnicos para garantir o funcionamento ideal e aumentar a vida útil da sua impressora.",
    categoria: "Manutenção e Suporte Técnico",
    imagem: "https://images.pexels.com/photos/209151/pexels-photo-209151.jpeg?auto=compress&w=400"
  },
  {
    nome: "Instalação e Configuração de Impressora",
    valor: 50.00,
    descricao: "Instalamos e configuramos sua impressora nova no computador ou na rede, garantindo que tudo funcione perfeitamente.",
    categoria: "Manutenção e Suporte Técnico",
    imagem: "https://images.pexels.com/photos/38273/ipad-tablet-technology-touch-screen-38273.jpeg?auto=compress&w=400"
  },
  {
    nome: "Upgrade de Hardware (Memória RAM, SSD)",
    valor: 100.00,
    descricao: "Mão de obra especializada para instalar e configurar Memória RAM ou SSD e deixar seu computador até 10x mais rápido (peças não inclusas).",
    categoria: "Manutenção e Suporte Técnico",
    imagem: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&w=400"
  },
  {
    nome: "Suporte Técnico Remoto",
    valor: 100.00,
    descricao: "Resolvemos problemas de software, configurações e tiramos dúvidas de forma ágil e segura via acesso remoto (sessão de até 1h).",
    categoria: "Manutenção e Suporte Técnico",
    imagem: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&w=400"
  },

  // =========================================================================
  // CATEGORIA: SERVIÇOS GRÁFICOS E DE PAPELARIA
  // =========================================================================
  {
    nome: "Impressão P&B (por página)",
    valor: 1.00,
    descricao: "Impressão de alta qualidade em preto e branco para documentos, trabalhos e boletos.",
    categoria: "Serviços Gráficos e de Papelaria",
    imagem: "https://images.pexels.com/photos/5088017/pexels-photo-5088017.jpeg?auto=compress&w=400"
  },
  {
    nome: "Impressão Colorida (por página)",
    valor: 2.00,
    descricao: "Impressão colorida vibrante para apresentações, gráficos e outros materiais de destaque.",
    categoria: "Serviços Gráficos e de Papelaria",
    imagem: "https://images.pexels.com/photos/1420003/pexels-photo-1420003.jpeg?auto=compress&w=400"
  },
  {
    nome: "Digitalização de Documentos (por página)",
    valor: 1.00,
    descricao: "Digitalização de documentos e fotos com alta resolução, salvos em PDF ou JPG e enviados por e-mail.",
    categoria: "Serviços Gráficos e de Papelaria",
    imagem: "https://images.pexels.com/photos/724941/pexels-photo-724941.jpeg?auto=compress&w=400"
  },
  {
    nome: "Plastificação de Documentos (A4)",
    valor: 3.00,
    descricao: "Proteja seus documentos importantes com plastificação resistente no formato A4.",
    categoria: "Serviços Gráficos e de Papelaria",
    imagem: "https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&w=400"
  },
  {
    nome: "Plastificação de Documentos (Pequeno)",
    valor: 2.00,
    descricao: "Plastificação para documentos menores como RG, CPF, Título de Eleitor, etc.",
    categoria: "Serviços Gráficos e de Papelaria",
    imagem: "https://images.pexels.com/photos/326576/pexels-photo-326576.jpeg?auto=compress&w=400"
  },
  {
    nome: "Corte com Guilhotina",
    valor: 2.00,
    descricao: "Corte preciso com guilhotina para acabamento profissional de seus impressos (até 20 folhas).",
    categoria: "Serviços Gráficos e de Papelaria",
    imagem: "https://images.pexels.com/photos/4057737/pexels-photo-4057737.jpeg?auto=compress&w=400"
  },
  
  // =========================================================================
  // CATEGORIA: SOLUÇÕES PARA NEGÓCIOS E PRESENÇA ONLINE
  // =========================================================================
  {
    nome: "Pacote 'Presença Online Essencial'",
    valor: 150.00,
    descricao: "A forma mais rápida de colocar sua empresa no mapa digital: criamos e otimizamos seu perfil no Google Meu Negócio e contas profissionais.",
    categoria: "Soluções para Negócios e Presença Online",
    imagem: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&w=400"
  },
  {
    nome: "Criação de Landing Pages Promocionais",
    valor: 450.00,
    descricao: "Desenvolvimento de uma página única e moderna, focada em converter visitantes em clientes para suas campanhas e eventos. (Valor a partir de).",
    categoria: "Soluções para Negócios e Presença Online",
    imagem: "https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&w=400"
  },
  {
    nome: "Criação de Sites Institucionais",
    valor: 750.00,
    descricao: "A vitrine profissional da sua empresa na internet. Desenvolvemos um site completo, responsivo e otimizado para ser encontrado no Google. (Valor a partir de).",
    categoria: "Soluções para Negócios e Presença Online",
    imagem: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&w=400"
  },
  {
    nome: "Atualização e Manutenção de Site",
    valor: 150.00,
    descricao: "Serviços de manutenção, atualização de conteúdo e correções de segurança em sites já existentes. (Valor por hora ou pacote).",
    categoria: "Soluções para Negócios e Presença Online",
    imagem: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&w=400"
  },

  // =========================================================================
  // CATEGORIA: CONSULTORIA E TREINAMENTO
  // =========================================================================
  {
    nome: "Configuração de Backup em Nuvem",
    valor: 80.00,
    descricao: "Proteja seus dados! Implementamos uma rotina de backup automático e seguro no Google Drive ou OneDrive para evitar perdas.",
    categoria: "Consultoria e Treinamento",
    imagem: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&w=400"
  },
  {
    nome: "Consultoria para Compra de Equipamentos",
    valor: 60.00,
    descricao: "Orientação especializada para a escolha do PC, notebook ou periférico ideal, garantindo o melhor custo-benefício para você.",
    categoria: "Consultoria e Treinamento",
    imagem: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=400"
  },
  {
    nome: "Aulas Básicas de Informática",
    valor: 50.00,
    descricao: "Aulas particulares de informática, internet ou Pacote Office para todos os níveis, com foco nas suas necessidades. (Valor por hora).",
    categoria: "Consultoria e Treinamento",
    imagem: "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&w=400"
  },
  {
    nome: "Consultoria para Licenciamento de Software",
    valor: 300.00,
    descricao: "Auxiliamos sua empresa a adquirir e regularizar as licenças de software necessárias, garantindo conformidade e segurança. (Valor a partir de).",
    categoria: "Consultoria e Treinamento",
    imagem: "https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&w=400"
  },
  {
    nome: "Pacote de Manutenção Mensal (Empresas)",
    valor: null, // Sob Consulta
    descricao: "Plano personalizado de manutenção preventiva e suporte técnico contínuo para garantir a produtividade do seu negócio.",
    categoria: "Consultoria e Treinamento",
    imagem: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=400"
  }
];