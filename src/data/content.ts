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

export const PAINS = [
  { icon: 'clock', title: 'Tempo perdido', text: 'com burocracia e retrabalho operacional que sugam a energia da sua equipe.' },
  { icon: 'eye-off', title: 'Decisões no escuro', text: 'por falta de dados financeiros confiáveis e atualizados em tempo real.' },
  { icon: 'lock', title: 'Crescimento travado', text: 'por ausência de suporte estratégico integrado para escalar com segurança.' },
] as const

export const PILLARS = [
  { title: 'Visão 360°', text: 'Entendemos o negócio do cliente de forma completa, não apenas os números. Analisamos cada detalhe para fornecer insights que impulsionam resultados reais.' },
  { title: 'Atendimento proativo', text: 'Antecipamos demandas antes que se tornem problemas. Nossa equipe está sempre um passo à frente, garantindo segurança e tranquilidade para sua gestão.' },
  { title: 'Ecossistema integrado', text: 'Uma única parceria resolve múltiplas áreas do seu negócio. Simplificamos a gestão centralizando serviços essenciais com alto padrão de qualidade.' },
]

export const SERVICES = [
  { icon: 'file-text', title: 'Assistência Contábil', text: 'Escrituração, obrigações fiscais e relatórios gerenciais mensais.' },
  { icon: 'bar-chart', title: 'Controladoria', text: 'Planejamento financeiro, análise de custos e indicadores de desempenho.' },
  { icon: 'wallet', title: 'BPO Financeiro', text: 'Gestão completa do contas a pagar e receber, conciliação bancária.' },
  { icon: 'users', title: 'Departamento Pessoal', text: 'Folha de pagamento, admissões, demissões e compliance trabalhista.' },
  { icon: 'hand-coins', title: 'Crédito & Cobrança', text: 'Acesso a linhas de crédito e gestão profissional da inadimplência.' },
  { icon: 'shield-check', title: 'Certificação Digital', text: 'Emissão e renovação de certificados e-CPF e e-CNPJ.' },
  { icon: 'badge', title: 'Registro de Marcas', text: 'Proteção da identidade da sua empresa junto ao INPI.' },
] as const

export const DIGITAL_FEATURES = [
  { icon: 'smartphone', title: 'App exclusivo', text: 'Abertura de chamados, envio de documentos e acompanhamento em tempo real direto pelo celular.' },
  { icon: 'monitor', title: 'Portal web', text: 'Acesso completo às ferramentas e relatórios via navegador, sem necessidade de instalação.' },
  { icon: 'workflow', title: 'Processos sistematizados', text: 'Fluxos automatizados que eliminam retrabalho e garantem prazos cumpridos rigorosamente.' },
] as const

export const RESULTS = [
  { value: 40, suffix: '%', title: 'Redução de tempo', text: 'gasto com processos administrativos e fiscais, liberando a equipe para focar no core business.' },
  { value: 25, suffix: '%', title: 'Economia em tributos', text: 'com planejamento tributário adequado ao regime correto e análise detalhada da operação.' },
  { value: 3, suffix: 'x', title: 'Mais acesso a crédito', text: 'com documentação contábil organizada, atualizada e relatórios gerenciais precisos.' },
  { value: 100, suffix: '%', title: 'Conformidade total', text: 'fiscal e trabalhista, eliminando riscos de multas, autuações e passivos ocultos.' },
]

export const TEAM_POINTS = [
  'Formação técnica e experiência de mercado em cada área',
  'Atendimento personalizado com gestor de conta dedicado',
  'Cultura de melhoria contínua e atualização constante',
  'Relatórios claros e comunicação direta e honesta',
]

export const STEPS = [
  { n: '01', title: 'Primeira conversa', text: 'Entendemos a situação atual da sua empresa e identificamos oportunidades de melhoria.' },
  { n: '02', title: 'Proposta personalizada', text: 'Montamos um pacote de serviços adaptado à fase e às necessidades do seu negócio.' },
  { n: '03', title: 'Onboarding digital', text: 'Migração ágil e sem dor de cabeça, com suporte completo da nossa equipe.' },
  { n: '04', title: 'Acompanhamento contínuo', text: 'Relatórios mensais, reuniões estratégicas e suporte proativo via app e web.' },
]

export const PLANS = {
  tiers: [
    { name: 'Essencial', audience: 'Ideal para MEI e pequenas empresas', support: 'Digital', featured: false },
    { name: 'Crescimento', audience: 'Empresas em expansão', support: 'Dedicado', featured: true },
    { name: 'Estratégico', audience: 'Médias empresas e grupos', support: 'Estratégico', featured: false },
  ],
  rows: [
    { label: 'Contabilidade', values: [true, true, true] },
    { label: 'BPO Financeiro', values: [false, true, true] },
    { label: 'Controladoria', values: [false, false, true] },
  ] as { label: string; values: (boolean | string)[] }[],
}

export const FAQ = [
  { q: 'Posso trocar de contador sem dor de cabeça?', a: 'Sim. Nosso onboarding digital cuida da migração com suporte completo da equipe, de forma ágil e sem burocracia.' },
  { q: 'Preciso instalar algum sistema?', a: 'Não. Você acessa tudo pelo app exclusivo ou pelo portal web, direto do navegador, a qualquer hora.' },
  { q: 'Os planos servem para o meu porte de empresa?', a: 'Temos planos flexíveis do MEI ao empresário consolidado. Cada cliente recebe exatamente o que precisa, sem pagar por serviços que não utiliza.' },
  { q: 'Vocês atendem só contabilidade?', a: 'Não. Somos um ecossistema: contabilidade, controladoria, BPO financeiro, DP, crédito e cobrança, certificação digital e registro de marcas.' },
  { q: 'Terei um contato direto na equipe?', a: 'Sim. Você conta com atendimento personalizado e gestor de conta dedicado, além de relatórios claros e comunicação direta e honesta.' },
]

export const SEGMENTS = ['MEI', 'Comércio', 'Serviços', 'Indústria', 'Saúde', 'Tecnologia', 'E-commerce', 'Profissionais liberais']

/**
 * Equipe real da Conceito. ⚠️ Os depoimentos mais abaixo ainda são FICTÍCIOS (demonstração).
 * Em `photo` use um arquivo em /public (ex.: '/equipe/ana.jpg'); sem foto, mostra as iniciais.
 */
export interface Member {
  tier: number // 0 = CEO (frente), 1 = sócios, 2+ = demais colaboradores (cada nível fica mais ao fundo)
  name: string; title: string; area: string; about: string
  photo?: string; crc?: string
}
export const MEMBERS: Member[] = [
  { tier: 0, name: 'Victor Ferreira da Silva', title: 'CEO e sócio-administrador', area: 'Direção', crc: 'CRC-AL 008526/O-2', photo: '/equipe/victor.webp', about: 'Fundador e dono da Conceito. Define a visão do escritório, cuida das parcerias estratégicas e acompanha de perto os clientes, garantindo que contabilidade e gestão andem juntas.' },
  { tier: 1, name: 'Davi Lima', title: 'Gerente Contábil', area: 'Contabilidade', about: 'Sócio da Conceito, à frente da área contábil: escrituração, balanços e relatórios que dão clareza aos números da sua empresa.' },
  { tier: 1, name: 'Ailton', title: 'Gerente Fiscal', area: 'Fiscal', about: 'Sócio da Conceito, à frente da área fiscal: apuração de tributos, obrigações acessórias e planejamento tributário.' },
  { tier: 2, name: 'João Eduardo', title: 'Assistente Fiscal', area: 'Fiscal', about: 'Apoio na apuração de impostos, emissão de guias e controle das obrigações fiscais dos clientes.' },
  { tier: 2, name: 'Micael Santos', title: 'Assistente Administrativo', area: 'Administrativo', about: 'Organização de documentos, atendimento e suporte às rotinas administrativas do escritório.' },
  { tier: 2, name: 'Nayara Torres', title: 'Assistente Administrativa', area: 'Administrativo', about: 'Atendimento aos clientes, controle de documentos e apoio às rotinas administrativas do escritório.' },
]

/** Depoimentos aprovados para exibição pública (com autorização do cliente). */
export interface Testimonial { name: string; role: string; company: string; text: string; rating: number; result?: string }
export const TESTIMONIALS: Testimonial[] = [
  { name: 'Fernanda Lima', role: 'Sócia-proprietária', company: 'Clínica Vita Odonto', rating: 5, result: '−22% em tributos', text: 'Antes eu vivia atrás de guia e documento. Hoje tudo está no app e meu gestor me avisa dos prazos antes de eu lembrar. A revisão do regime tributário pagou o primeiro ano de contrato.' },
  { name: 'Diego Moura', role: 'Diretor', company: 'Moura Distribuidora', rating: 5, result: 'Crédito aprovado', text: 'Com os relatórios gerenciais organizados conseguimos crédito para ampliar o estoque. O BPO financeiro tirou um peso enorme da minha equipe.' },
  { name: 'Aline Barros', role: 'Fundadora', company: 'Ateliê Barros Moda', rating: 4, result: 'Migração em dias', text: 'A troca de contador foi muito mais simples do que eu imaginava. Atendimento próximo, linguagem clara e resposta rápida pelo WhatsApp.' },
]
