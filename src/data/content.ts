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
}

export const NAV = [
  { href: '#solucoes', label: 'Soluções' },
  { href: '#digital', label: 'Plataforma' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#processo', label: 'Como funciona' },
  { href: '#planos', label: 'Planos' },
  { href: '#faq', label: 'Dúvidas' },
]

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
    icon: 'file-text', title: 'Contabilidade', short: 'Impostos e obrigações em dia',
    text: 'Calculamos seus impostos, entregamos as declarações obrigatórias e explicamos os números da sua empresa de um jeito que você entende.',
    includes: ['Cálculo e emissão das guias de impostos', 'Declarações entregues no prazo', 'Relatório mensal simples de entender', 'Orientação para pagar menos imposto, dentro da lei'],
    ideal: 'Toda empresa, do MEI à LTDA',
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

/**
 * Planos (sem preço no site: o valor é combinado depois de uma conversa).
 * `features`: o que cada plano inclui, na ordem dos planos [Essencial, Crescimento, Estratégico].
 */
export const PLANS = {
  tiers: [
    { id: 'essencial', name: 'Essencial', icon: 'store', profile: 'Sou MEI ou estou começando', audience: 'Para MEI e pequenas empresas', support: 'Atendimento digital pelo app e WhatsApp', featured: false },
    { id: 'crescimento', name: 'Crescimento', icon: 'bar-chart', profile: 'Minha empresa está crescendo', audience: 'Para empresas em expansão', support: 'Contador dedicado à sua empresa', featured: true },
    { id: 'estrategico', name: 'Estratégico', icon: 'building', profile: 'Tenho uma empresa média ou grupo', audience: 'Para médias empresas e grupos', support: 'Reuniões estratégicas de acompanhamento', featured: false },
  ],
  features: [
    { label: 'Contabilidade e impostos em dia', values: [true, true, true] },
    { label: 'App e portal do cliente', values: [true, true, true] },
    { label: 'Gestão financeira (contas a pagar e a receber)', values: [false, true, true] },
    { label: 'Planejamento e controladoria', values: [false, false, true] },
  ],
}

/** Dúvidas frequentes, em linguagem simples e agrupadas por assunto. */
export const FAQ_CATEGORIES = ['Começar', 'Custos', 'Atendimento', 'Impostos'] as const
export const FAQ: { cat: (typeof FAQ_CATEGORIES)[number]; q: string; a: string }[] = [
  { cat: 'Começar', q: 'Posso trocar de contador a qualquer momento?', a: 'Sim. Nós cuidamos da conversa com o seu contador atual e da transferência dos documentos. Você não precisa se preocupar com nada e a sua empresa não para.' },
  { cat: 'Começar', q: 'Vocês abrem empresa do zero?', a: 'Sim. Indicamos o formato mais vantajoso para o seu negócio e cuidamos de todo o registro: CNPJ, alvarás e inscrições. Você só confere e assina.' },
  { cat: 'Começar', q: 'Sou MEI. Preciso de contador?', a: 'O MEI não é obrigado a ter contador, mas a ajuda evita erros nas guias e na declaração anual — e mostra a hora certa de deixar de ser MEI quando a empresa cresce.' },
  { cat: 'Custos', q: 'Quanto custa?', a: 'Depende do tamanho e da rotina da sua empresa. Depois de uma conversa rápida, enviamos uma proposta clara, com tudo o que está incluso e sem custos escondidos.' },
  { cat: 'Custos', q: 'Vou pagar por serviço que não uso?', a: 'Não. Os planos são montados de acordo com a sua empresa: você contrata só o que faz sentido e pode incluir outros serviços quando precisar.' },
  { cat: 'Atendimento', q: 'Preciso ir até o escritório?', a: 'Não é necessário. Você resolve tudo pelo app, pelo portal ou pelo WhatsApp. Se preferir conversar pessoalmente, nosso escritório fica em Palmeira dos Índios/AL.' },
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
