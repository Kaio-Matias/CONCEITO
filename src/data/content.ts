export const COMPANY = {
  name: 'Conceito Business',
  tagline: 'Soluções inteligentes, resultados reais.',
  phone: '(82) 99928-1926',
  whatsapp: '5582999281926',
  email: 'contato@conceitonegocos.com.br',
  instagram: '@conceitonegocios',
  instagramUrl: 'https://instagram.com/conceitonegocios',
  legalName: 'Conceito Contabilidade e Negócios LTDA',
  cnpj: '36.426.347/0001-48',
  crc: 'CRC-AL 008526/O-2',
  address: 'Rua Mariano de Freitas, 85, Sala 3 · São Cristóvão',
  city: 'Palmeira dos Índios/AL · CEP 57.601-070',
  /** Perfil da Conceito no Google Maps (link oficial) e o ponto exato do escritório. */
  mapsUrl: 'https://maps.app.goo.gl/CMFokGz27vFMutm86',
  mapsPlace: 'Conceito Contabilidade e Negócios, Palmeira dos Índios - AL',
  mapsCoords: '-9.40921,-36.632831',
}

/**
 * Menu do site em grupos (todas as seções da página inicial).
 * Grupo com `items` vira menu suspenso; grupo com `href` é um link direto.
 */
export interface NavItem { href: string; label: string; text: string; icon: string }
export interface NavGroup { label: string; href?: string; items?: NavItem[] }
export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'A Conceito',
    items: [
      { href: '#por-que', label: 'Por que ter contabilidade', text: 'Sem contador × com a Conceito', icon: 'shield-check' },
      { href: '#sobre', label: 'Quem somos', text: 'Contabilidade nascida em Alagoas', icon: 'landmark' },
      { href: '#equipe', label: 'Equipe', text: 'Os sócios que cuidam da sua empresa', icon: 'users' },
      { href: '#resultados', label: 'Resultados', text: 'O que muda na prática', icon: 'bar-chart' },
    ],
  },
  {
    label: 'Serviços',
    items: [
      { href: '#solucoes', label: 'Soluções', text: 'Todos os serviços contábeis', icon: 'file-text' },
      { href: '#planos', label: 'Planos', text: 'Do MEI à empresa de grande porte', icon: 'store' },
      { href: '#processo', label: 'Como funciona', text: 'O passo a passo para começar', icon: 'list' },
      { href: '#simulador', label: 'Simulador', text: 'Quanto sua empresa pode economizar', icon: 'wallet' },
    ],
  },
  { label: 'Plataforma', href: '#digital' },
  {
    label: 'Ajuda',
    items: [
      { href: '#faq', label: 'Dúvidas', text: 'Perguntas que sempre ouvimos', icon: 'search' },
      { href: '#feedback', label: 'Deixe seu feedback', text: 'Sua opinião sobre a Conceito', icon: 'star' },
      { href: '#contato', label: 'Contato', text: 'WhatsApp, e-mail e endereço', icon: 'phone' },
    ],
  },
]

/** Todas as seções em lista simples (rodapé e destaque da seção atual). */
export const NAV: { href: string; label: string }[] = NAV_GROUPS.flatMap((g) =>
  g.items ? g.items.map(({ href, label }) => ({ href, label })) : [{ href: g.href!, label: g.label }],
)

/** "Sem contador × Com a Conceito": situações do dia a dia, em linguagem simples. */
export const COMPARISON = [
  { icon: 'file-text', topic: 'Impostos', without: 'Guias esquecidas, multas por atraso e imposto pago a mais sem perceber.', with: 'Impostos calculados certo e pagos no prazo. Você é avisado antes de cada vencimento.' },
  { icon: 'wallet', topic: 'Seu dinheiro', without: 'No fim do mês, você não sabe se a empresa deu lucro ou prejuízo.', with: 'Relatórios simples mostram quanto entrou, quanto saiu e quanto sobrou.' },
  { icon: 'hand-coins', topic: 'Crédito', without: 'O banco nega o empréstimo porque faltam documentos e balanços.', with: 'Contas em ordem abrem as portas para crédito e financiamento.' },
  { icon: 'users', topic: 'Funcionários', without: 'Folha feita na mão e risco de processos trabalhistas.', with: 'Salários, férias e direitos calculados corretamente, todo mês.' },
] as const

/** Motivos para escolher a Conceito. */
export const REASONS = [
  { icon: 'badge', title: 'Contador registrado', text: 'Responsabilidade técnica com registro ativo no CRC-AL. Sua empresa em mãos profissionais.' },
  { icon: 'users', title: 'Gente que conhece você', text: 'Atendimento humano e próximo: você fala sempre com quem conhece a sua empresa.' },
  { icon: 'smartphone', title: 'Tudo pelo celular', text: 'App, portal e WhatsApp. Sem papelada e sem precisar sair de casa.' },
  { icon: 'workflow', title: 'Tudo em um só lugar', text: 'Contabilidade, folha, financeiro, certificado digital e registro de marca.' },
] as const

/** Fatos sobre o escritório (seção Quem somos). */
export const ABOUT_FACTS = [
  { icon: 'landmark', title: 'Escritório físico', text: 'Palmeira dos Índios/AL' },
  { icon: 'badge', title: 'Registro profissional', text: 'CRC-AL 008526/O-2' },
  { icon: 'smartphone', title: 'Presencial e digital', text: 'No escritório, no app ou no WhatsApp' },
] as const

/** Serviços, em linguagem simples: o que é, o que está incluso e para quem é. */
export const SERVICES = [
  {
    icon: 'store', title: 'Abertura de empresa', short: 'Seu CNPJ do jeito certo',
    text: 'Cuidamos de todo o processo para abrir sua empresa: escolhemos o melhor formato, fazemos o registro e deixamos tudo pronto para você começar a vender.',
    includes: ['Orientação sobre o melhor tipo de empresa', 'Registro na Junta, Receita e Prefeitura', 'Alvarás e inscrições necessárias', 'Transformação de MEI em microempresa'],
    ideal: 'Quem vai começar ou quer sair da informalidade',
  },
  {
    icon: 'file-text', title: 'Contabilidade', short: 'Sua empresa com números confiáveis',
    tag: 'ESCRITURAÇÃO E DEMONSTRAÇÕES',
    text: 'Registramos toda a movimentação da sua empresa e transformamos isso em balanço, DRE e relatórios que mostram a saúde real do negócio. É a base para tomar decisões, distribuir lucros com segurança e conseguir crédito.',
    includes: [
      'Escrituração contábil completa',
      'Balanço patrimonial e DRE',
      'Distribuição de lucros com respaldo legal',
      'Demonstrativos aceitos por bancos e investidores',
    ],
    ideal: 'Toda empresa que quer crescer com segurança, do Simples à LTDA de grande porte.',
  },
  {
    icon: 'receipt', title: 'Gestão Fiscal', short: 'Impostos e obrigações em dia',
    tag: 'IMPOSTOS E OBRIGAÇÕES EM DIA',
    text: 'Calculamos seus impostos, entregamos as declarações obrigatórias no prazo e buscamos sempre o menor imposto possível, dentro da lei.',
    includes: [
      'Cálculo e emissão das guias de impostos',
      'Declarações entregues no prazo',
      'Revisão do regime tributário',
      'Orientação para pagar menos imposto, dentro da lei',
    ],
    ideal: 'Toda empresa, do MEI à LTDA.',
  },
  {
    icon: 'users', title: 'Folha de pagamento', short: 'Sua equipe paga certinho',
    text: 'Cuidamos de tudo o que envolve seus funcionários, para você não correr riscos com a lei trabalhista.',
    includes: ['Salários, férias e 13º calculados', 'Admissões e demissões', 'FGTS, INSS e eSocial em dia', 'Pró-labore dos sócios'],
    ideal: 'Empresas com funcionários ou sócios com pró-labore',
  },
  {
    icon: 'wallet', title: 'Gestão financeira', short: 'Dinheiro organizado',
    text: 'Organizamos as finanças da sua empresa para você saber exatamente quanto entra, quanto sai e quanto sobra.',
    includes: ['Contas a pagar e a receber', 'Conferência do extrato bancário', 'Controle do fluxo de caixa', 'Relatórios para decidir com segurança'],
    ideal: 'Quem não tem tempo de cuidar do financeiro',
  },
  {
    icon: 'bar-chart', title: 'Planejamento', short: 'Decisões com números na mão',
    text: 'Analisamos custos, margens e resultados para ajudar você a planejar o crescimento da empresa.',
    includes: ['Análise de custos e preços', 'Planejamento de impostos', 'Metas e indicadores do negócio', 'Reuniões de acompanhamento'],
    ideal: 'Empresas que querem crescer com segurança',
  },
  {
    icon: 'hand-coins', title: 'Crédito e cobrança', short: 'Portas abertas no banco',
    text: 'Preparamos a documentação para você conseguir crédito com mais facilidade e ajudamos a receber de quem está devendo.',
    includes: ['Balanços e relatórios para o banco', 'Apoio na busca por linhas de crédito', 'Organização da cobrança de clientes', 'Acompanhamento da inadimplência'],
    ideal: 'Quem precisa de empréstimo ou tem clientes em atraso',
  },
  {
    icon: 'shield-check', title: 'Certificado digital', short: 'e-CPF e e-CNPJ',
    text: 'Emitimos e renovamos o certificado digital da sua empresa, necessário para notas fiscais e serviços do governo.',
    includes: ['Emissão de e-CPF e e-CNPJ', 'Renovação antes do vencimento', 'Ajuda na instalação', 'Aviso quando estiver perto de vencer'],
    ideal: 'Empresas que emitem nota fiscal',
  },
  {
    icon: 'badge', title: 'Registro de marca', short: 'Seu nome protegido',
    text: 'Registramos a marca da sua empresa no INPI para que ninguém possa usar o seu nome.',
    includes: ['Pesquisa de disponibilidade da marca', 'Pedido de registro no INPI', 'Acompanhamento do processo', 'Orientação até a concessão'],
    ideal: 'Quem quer proteger o nome e a identidade do negócio',
  },
] as const

/** Resultados de referência da Conceito, em linguagem simples (cada um tem um gráfico próprio). */
export const RESULTS = [
  { kind: 'time', prefix: 'até', value: 40, suffix: '%', title: 'menos tempo com burocracia', text: 'Com app, documentos digitais e processos organizados, você deixa de perder horas com papelada.' },
  { kind: 'tax', prefix: 'até', value: 25, suffix: '%', title: 'de economia em impostos', text: 'Revisamos o regime e a atividade da empresa para você não pagar imposto a mais — sempre dentro da lei.' },
  { kind: 'credit', prefix: 'até', value: 3, suffix: 'x', title: 'mais acesso a crédito', text: 'Balanços e relatórios em dia mostram ao banco que sua empresa é organizada e saudável.' },
  { kind: 'ok', prefix: '', value: 100, suffix: '%', title: 'das obrigações no prazo', text: 'Guias e declarações entregues em dia: sem multas e sem sustos com a Receita.' },
] as const

/** "Como funciona": o passo a passo para cada tipo de cliente. `who` mostra de quem é a tarefa. */
export const PROCESS_PATHS = [
  {
    id: 'abrir', label: 'Quero abrir minha empresa', icon: 'store',
    message: 'Olá! Quero abrir minha empresa e gostaria de começar pela primeira conversa.',
    steps: [
      { icon: 'message', who: 'Você + Conceito', title: 'Primeira conversa', text: 'Você conta a sua ideia e nós indicamos o melhor formato de empresa para começar.' },
      { icon: 'file-text', who: 'Por nossa conta', title: 'Proposta clara', text: 'Você recebe o valor e tudo o que está incluso, sem letras miúdas.' },
      { icon: 'badge', who: 'Por nossa conta', title: 'Registro da empresa', text: 'Cuidamos do CNPJ, alvarás e inscrições. Você só confere e assina.' },
      { icon: 'check', who: 'Por nossa conta', title: 'Pronto para faturar', text: 'Empresa aberta, app instalado e nossa equipe acompanhando você todo mês.' },
    ],
  },
  {
    id: 'trocar', label: 'Quero trocar de contador', icon: 'refresh',
    message: 'Olá! Quero trocar de contador e gostaria de começar pela primeira conversa.',
    steps: [
      { icon: 'message', who: 'Você + Conceito', title: 'Primeira conversa', text: 'Entendemos a situação atual da sua empresa e tiramos todas as suas dúvidas.' },
      { icon: 'file-text', who: 'Por nossa conta', title: 'Proposta clara', text: 'Você recebe o valor e tudo o que está incluso, sem letras miúdas.' },
      { icon: 'refresh', who: 'Por nossa conta', title: 'Troca sem dor de cabeça', text: 'Falamos com o seu contador atual e recebemos todos os documentos.' },
      { icon: 'check', who: 'Por nossa conta', title: 'Acompanhamento de perto', text: 'A partir daí, cuidamos de tudo — com relatórios e atendimento todo mês.' },
    ],
  },
] as const

export interface PlanFeatureItem {
  label: string
  detail: string
  included: boolean
  highlight?: boolean
}

export interface PlanColumn {
  title: string
  items: string[]
}

export interface PlanItem {
  id: string
  name: string
  badge?: string
  icon: string
  profile: string
  audience: string
  featured?: boolean
  ctaText: string
  ctaMessage: string
  support: string
  fiscal: string
  accounting: string
  payroll: string
  financial: string
  reports: string
  planning: string
  taxReform: string
  portal: string
  credit?: string
  bonus?: string
  features: PlanFeatureItem[]
  columns?: PlanColumn[]
}

const STRIP_PLAN: PlanItem = {
  id: 'largada',
  name: 'Largada',
  badge: 'Para MEI',
  icon: 'store',
  profile: 'MEI',
  audience: 'Para MEI que quer empreender sem medo de burocracia',
  ctaText: 'Quero o plano Largada',
  ctaMessage: 'Olá! Tenho interesse no plano Largada da Conceito (MEI) e gostaria de uma proposta.',
  support: 'App e WhatsApp',
  fiscal: 'DAS e DASN',
  accounting: '—',
  payroll: '1 funcionário',
  financial: '—',
  reports: '—',
  planning: '—',
  taxReform: 'Alertas',
  portal: '✓ Incluso',
  bonus: 'Ajuda para desenquadrar do MEI',
  features: [
    { label: 'Gestão Fiscal', detail: 'DAS e DASN em dia', included: true },
    { label: 'Folha de pagamento', detail: '1 funcionário incluso', included: true },
    { label: 'Reforma Tributária', detail: 'Alertas de impacto e prazos', included: true },
    { label: 'App e portal', detail: 'Acesso completo pelo celular', included: true },
    { label: 'Atendimento', detail: 'App e WhatsApp', included: true },
    { label: 'Bônus de upgrade', detail: 'Ajuda para desenquadrar do MEI quando a empresa crescer', included: true, highlight: true },
  ],
}

const GRID_PLANS: PlanItem[] = [
  {
    id: 'base',
    name: 'Base',
    icon: 'file-text',
    profile: 'Simples, pequenas',
    audience: 'Para empresas do Simples Nacional e pequenas operações',
    ctaText: 'Quero o plano Base',
    ctaMessage: 'Olá! Tenho interesse no plano Base da Conceito e gostaria de uma proposta.',
    support: 'App e WhatsApp',
    fiscal: 'Gestão fiscal completa',
    accounting: 'Simplificada (balanço e DRE anuais – ITG 1000)',
    payroll: 'Até 3 funcionários',
    financial: '—',
    reports: '—',
    planning: '—',
    taxReform: 'Alertas',
    portal: '✓ Incluso',
    features: [
      { label: 'Gestão Fiscal', detail: 'Apuração e emissão de guias em dia', included: true },
      { label: 'Escrituração contábil', detail: 'Simplificada (balanço e DRE anuais – ITG 1000)', included: true },
      { label: 'Folha de pagamento', detail: 'Até 3 funcionários inclusos', included: true },
      { label: 'Gestão financeira (pagar e receber)', detail: 'Não inclusa', included: false },
      { label: 'Relatórios gerenciais', detail: 'Não inclusos', included: false },
      { label: 'Planejamento e controladoria', detail: 'Não incluso', included: false },
      { label: 'Reforma Tributária', detail: 'Alertas de mudanças', included: true },
      { label: 'App e portal', detail: 'Acesso web e app integrado', included: true },
    ],
  },
  {
    id: 'impulso',
    name: 'Impulso',
    badge: 'Mais escolhido',
    icon: 'bar-chart',
    profile: 'Em expansão',
    audience: 'Para empresas do Simples e Lucro Presumido em expansão',
    featured: true,
    ctaText: 'Quero o plano Impulso',
    ctaMessage: 'Olá! Tenho interesse no plano Impulso da Conceito e gostaria de uma proposta.',
    support: 'Contador dedicado',
    fiscal: 'Gestão fiscal completa',
    accounting: 'Completa e mensal',
    payroll: 'Até 10 funcionários',
    financial: 'Gestão de contas a pagar e receber',
    reports: 'DRE mensal',
    planning: '—',
    taxReform: 'Diagnóstico',
    portal: '✓ Incluso',
    features: [
      { label: 'Gestão Fiscal', detail: 'Completa e apurações mensais', included: true },
      { label: 'Escrituração contábil', detail: 'Completa e mensal', included: true },
      { label: 'Folha de pagamento', detail: 'Até 10 funcionários inclusos', included: true },
      { label: 'Gestão financeira (pagar e receber)', detail: 'Acompanhamento de pagar e receber', included: true },
      { label: 'Relatórios gerenciais', detail: 'DRE mensal detalhada', included: true },
      { label: 'Planejamento e controladoria', detail: 'Não incluso', included: false },
      { label: 'Reforma Tributária', detail: 'Diagnóstico personalizado da sua operação', included: true },
      { label: 'App e portal', detail: 'Acesso web e app integrado', included: true },
    ],
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: 'building',
    profile: 'Médias e grupos',
    audience: 'Para médias empresas e grupos com gestão ativa',
    ctaText: 'Falar com um especialista',
    ctaMessage: 'Olá! Tenho interesse no plano Performance da Conceito e gostaria de falar com um especialista.',
    support: 'Contador + reunião mensal',
    fiscal: 'Gestão fiscal completa',
    accounting: 'Completa e mensal',
    payroll: 'Sob medida',
    financial: 'Gestão de contas a pagar e receber',
    reports: 'DRE + indicadores',
    planning: 'Planejamento e controladoria',
    taxReform: 'Plano de transição',
    portal: '✓ Incluso',
    features: [
      { label: 'Gestão Fiscal', detail: 'Completa e apurações complexas', included: true },
      { label: 'Escrituração contábil', detail: 'Completa e mensal', included: true },
      { label: 'Folha de pagamento', detail: 'Dimensionada sob medida', included: true },
      { label: 'Gestão financeira (pagar e receber)', detail: 'Acompanhamento de pagar e receber', included: true },
      { label: 'Relatórios gerenciais', detail: 'DRE + indicadores de desempenho', included: true },
      { label: 'Planejamento e controladoria', detail: 'Planejamento orçamentário e estratégico', included: true },
      { label: 'Reforma Tributária', detail: 'Plano de transição estruturado', included: true },
      { label: 'App e portal', detail: 'Acesso web e app integrado', included: true },
    ],
  },
]

const WIDE_PLAN: PlanItem = {
  id: 'conceito-360',
  name: 'Conceito 360',
  badge: 'Solução Completa · Grandes Empresas',
  icon: 'shield-check',
  profile: 'Grandes empresas',
  audience: 'Para grandes empresas e grupos corporativos que exigem gestão de ponta a ponta',
  ctaText: 'Fale com a gente',
  ctaMessage: 'Olá! Tenho interesse no plano Conceito 360 da Conceito e gostaria de falar com a equipe.',
  support: 'Equipe dedicada + reuniões',
  fiscal: 'Gestão fiscal completa',
  accounting: 'Completa e mensal',
  payroll: 'Sob medida',
  financial: 'BPO completo',
  reports: 'Dashboard em tempo real',
  planning: 'Planejamento e controladoria',
  taxReform: 'Plano de transição',
  portal: '✓ Incluso',
  credit: 'Análise de crédito, régua de cobrança, boletos, inadimplência e conciliação + captação de crédito bancário',
  features: [
    { label: 'Gestão Fiscal', detail: 'Completa e mensal', included: true },
    { label: 'Escrituração contábil', detail: 'Completa e mensal', included: true },
    { label: 'Folha de pagamento', detail: 'Sob medida para a operação', included: true },
    { label: 'Gestão financeira', detail: 'BPO financeiro completo (pagar e receber)', included: true, highlight: true },
    { label: 'Relatórios gerenciais', detail: 'Dashboard em tempo real', included: true, highlight: true },
    { label: 'Planejamento e controladoria', detail: 'Controladoria estratégica ativa', included: true },
    { label: 'Crédito e cobrança', detail: 'Análise, régua de cobrança, boletos + captação bancária', included: true, highlight: true },
    { label: 'Reforma Tributária', detail: 'Plano de transição estruturado', included: true },
    { label: 'App e portal', detail: 'Acesso web e app integrado', included: true },
    { label: 'Atendimento', detail: 'Equipe dedicada + reuniões periódicas', included: true },
  ],
  columns: [
    {
      title: 'Fiscal, Contábil & Folha',
      items: [
        'Gestão fiscal completa e apuração mensal',
        'Escrituração contábil completa e mensal',
        'Folha de pagamento sob medida para a empresa',
        'Reforma Tributária: plano de transição estruturado',
      ],
    },
    {
      title: 'Financeiro & Controladoria',
      items: [
        'BPO financeiro completo (contas a pagar e receber)',
        'Dashboard gerencial em tempo real',
        'Planejamento orçamentário e controladoria',
        'App e portal do cliente com múltiplos acessos',
      ],
    },
    {
      title: 'Crédito e Cobrança (Duas frentes)',
      items: [
        'Crédito e cobrança dos clientes: análise pré-venda, régua de cobrança, boletos, controle de inadimplência e conciliação',
        'Crédito para a empresa: apoio na captação bancária, demonstrativos exigidos e análise de linhas de crédito',
      ],
    },
  ],
}

/**
 * Estrutura dos 5 planos (Linha Jornada) baseada na planilha oficial:
 * 1. Largada (MEI) - Faixa acima dos cards
 * 2. Base (Simples / pequenas) - Card
 * 3. Impulso ⭐ (Simples e Presumido em expansão) - Card (destaque)
 * 4. Performance (Médias e grupos) - Card
 * 5. Conceito 360 (Grandes empresas) - Card largo abaixo dos cards
 */
export const PLANS = {
  strip: STRIP_PLAN,
  grid: GRID_PLANS,
  wide: WIDE_PLAN,
  all: [STRIP_PLAN, ...GRID_PLANS, WIDE_PLAN],
  extraNote: 'Adicionais em qualquer plano: folha de pagamento, certificado digital, abertura de empresa, registro de marca, BPO financeiro completo e IR dos sócios.',
  // Retrocompatibilidade
  tiers: [STRIP_PLAN, ...GRID_PLANS, WIDE_PLAN],
}

/** Dúvidas frequentes, em linguagem simples e agrupadas por assunto. */
export const FAQ_CATEGORIES = ['Começar', 'Custos', 'Atendimento', 'Impostos'] as const
export const FAQ: { cat: (typeof FAQ_CATEGORIES)[number]; q: string; a: string }[] = [
  { cat: 'Começar', q: 'Posso trocar de contador a qualquer momento?', a: 'Sim. A Conceito conversa com o seu contador atual, recebe os documentos e cuida de toda a transição. Sua empresa não para e você não precisa se preocupar com nada. Só vale conferir o prazo de aviso do contrato atual, que a gente ajuda a ver.' },
  { cat: 'Começar', q: 'Vocês abrem empresa do zero?', a: 'Sim. Ajudamos a escolher o tipo de empresa e o regime de impostos que fazem você pagar menos, e cuidamos de todo o registro até o CNPJ ficar pronto para emitir nota.' },
  { cat: 'Começar', q: 'Sou MEI. Preciso de contador?', a: 'O MEI não é obrigado a ter contador, mas a ajuda evita erros nas guias e na declaração anual — e mostra a hora certa de deixar de ser MEI quando a empresa cresce.' },
  { cat: 'Custos', q: 'Quanto custa?', a: 'Depende do tamanho e da rotina da sua empresa. Depois de uma conversa rápida, enviamos uma proposta clara, com tudo o que está incluso e sem custos escondidos.' },
  { cat: 'Custos', q: 'Vou pagar por serviço que não uso?', a: 'Não. Os planos são montados de acordo com a sua empresa: você contrata só o que faz sentido e pode incluir outros serviços quando precisar.' },
  { cat: 'Atendimento', q: 'Preciso ir até o escritório?', a: 'Não precisa, mas pode. Você resolve tudo pelo app, pelo portal do cliente ou pelo WhatsApp, de onde estiver. Se preferir conversar pessoalmente, é só agendar um horário em uma das nossas unidades. Vai ser um prazer receber você para um café.' },
  { cat: 'Atendimento', q: 'Preciso instalar algum sistema?', a: 'Não. Você usa o nosso app no celular ou o portal web direto no navegador, a qualquer hora.' },
  { cat: 'Atendimento', q: 'Com quem eu vou falar?', a: 'Com a nossa equipe — sempre as mesmas pessoas. Você sabe quem cuida da sua empresa e tem um canal direto com elas.' },
  { cat: 'Impostos', q: 'Vocês me ajudam a pagar menos imposto?', a: 'Sim, sempre dentro da lei. Revisamos o regime e a atividade da sua empresa para que você não pague nada além do necessário.' },
  { cat: 'Impostos', q: 'Tenho impostos atrasados. Vocês ajudam?', a: 'Sim. Analisamos a situação da sua empresa e orientamos o melhor caminho para regularizar, incluindo parcelamentos quando for possível.' },
]

export const SEGMENTS = ['MEI', 'Comércio', 'Serviços', 'Indústria', 'Saúde', 'Tecnologia', 'E-commerce', 'Profissionais liberais']

/**
 * Sócios da Conceito (seção Equipe). Em `photo` use um arquivo em /public; sem foto, mostra as iniciais.
 * Textos em linguagem simples: o que cada um faz e em que é especialista dentro da contabilidade.
 */
export interface Owner {
  name: string; role: string; area: string; photo?: string; crc?: string
  about: string; specialties: string[]; forYou: string[]
}
export const OWNERS: Owner[] = [
  {
    name: 'Victor Ferreira da Silva', role: 'Fundador e sócio-administrador', area: 'Direção e estratégia',
    photo: '/equipe/victor.webp', crc: 'CRC-AL 008526/O-2',
    about: 'Fundou a Conceito para ir além das obrigações fiscais. Define os rumos do escritório e acompanha de perto cada cliente, para que contabilidade e gestão andem juntas.',
    specialties: ['Gestão empresarial', 'Planejamento estratégico', 'Relacionamento com clientes'],
    forYou: ['Entende o momento da sua empresa', 'Monta o plano certo para o seu negócio', 'Acompanha seus resultados de perto'],
  },
  {
    name: 'Davi Lima', role: 'Sócio e gerente contábil', area: 'Contabilidade',
    about: 'Está à frente da área contábil. Cuida para que os números da sua empresa estejam sempre corretos, organizados e fáceis de entender.',
    specialties: ['Escrituração contábil', 'Balanços e demonstrativos', 'Relatórios gerenciais'],
    forYou: ['Mantém a contabilidade em dia', 'Prepara balanços para bancos e sócios', 'Explica os números em linguagem simples'],
  },
  {
    name: 'Ailton', role: 'Sócio e gerente fiscal', area: 'Impostos',
    about: 'Está à frente da área fiscal. Garante que sua empresa pague os impostos certos, no prazo, e sem pagar nada a mais.',
    specialties: ['Apuração de impostos', 'Obrigações fiscais', 'Planejamento tributário'],
    forYou: ['Calcula e emite suas guias', 'Entrega as declarações no prazo', 'Busca formas legais de reduzir impostos'],
  },
]

/**
 * Depoimentos REAIS aprovados para exibição pública (com autorização do cliente).
 * Vazio de propósito: os exemplos fictícios foram removidos. Ao receber depoimentos autorizados
 * pelo formulário de feedback, adicione-os aqui — eles aparecem automaticamente no site.
 * Ex.: { name: 'Nome do cliente', role: 'Cargo', company: 'Empresa', rating: 5, text: '...' }
 */
export interface Testimonial { name: string; role: string; company: string; text: string; rating: number }
export const TESTIMONIALS: Testimonial[] = []
