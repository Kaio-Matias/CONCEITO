/**
 * SEO no build: dados estruturados (schema.org), URLs absolutas, robots.txt e sitemap.xml.
 * Tudo é gerado a partir de src/data/content.ts, para nunca ficar desatualizado em relação ao site.
 *
 * Variáveis de ambiente (arquivo .env ou painel da Vercel):
 *   VITE_SITE_URL           domínio oficial, ex.: https://www.seudominio.com.br  (sem barra no final)
 *   VITE_GA_ID              ID do Google Analytics 4, ex.: G-XXXXXXXXXX          (lido em src/services/analytics.ts)
 *   VITE_GSC_VERIFICATION   código de verificação do Google Search Console (opcional)
 */
import type { HtmlTagDescriptor, Plugin } from 'vite'
import { COMPANY, FAQ, OWNERS, SERVICES } from './src/data/content.ts'

const TITLE = 'Contabilidade em Palmeira dos Índios/AL | Conceito Contabilidade e Negócios'
const DESCRIPTION =
  'Escritório de contabilidade em Palmeira dos Índios/AL: abertura de empresa, troca de contador, impostos, folha de pagamento e gestão financeira. Atendimento pelo WhatsApp e app.'

const phoneE164 = `+${COMPANY.whatsapp}`
const [lat, lng] = COMPANY.mapsCoords.split(',').map(Number)

function jsonLd(site: string | undefined) {
  const abs = (path: string) => (site ? `${site}${path}` : path)
  const business = {
    '@context': 'https://schema.org',
    '@type': ['AccountingService', 'LocalBusiness'],
    '@id': abs('/#empresa'),
    name: 'Conceito Contabilidade e Negócios',
    alternateName: COMPANY.name,
    legalName: COMPANY.legalName,
    description: DESCRIPTION,
    url: abs('/'),
    logo: abs('/logos/logo-02.png'),
    image: abs('/og-image.png'),
    telephone: phoneE164,
    email: COMPANY.email,
    taxID: COMPANY.cnpj,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Mariano de Freitas, 85, Sala 3 - São Cristóvão',
      addressLocality: 'Palmeira dos Índios',
      addressRegion: 'AL',
      postalCode: '57601-070',
      addressCountry: 'BR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng },
    hasMap: COMPANY.mapsUrl,
    areaServed: [{ '@type': 'City', name: 'Palmeira dos Índios' }, { '@type': 'State', name: 'Alagoas' }, { '@type': 'Country', name: 'Brasil' }],
    sameAs: [COMPANY.instagramUrl, COMPANY.mapsUrl],
    founder: OWNERS.filter((o) => o.role.toLowerCase().includes('fundador')).map((o) => ({ '@type': 'Person', name: o.name, jobTitle: o.role })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de contabilidade',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.text, areaServed: 'Palmeira dos Índios/AL' },
      })),
    },
    contactPoint: {
      '@type': 'ContactPoint', telephone: phoneE164, contactType: 'customer service', availableLanguage: 'Portuguese',
    },
  }
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs('/#site'),
    name: 'Conceito Contabilidade e Negócios',
    url: abs('/'),
    inLanguage: 'pt-BR',
    publisher: { '@id': abs('/#empresa') },
  }
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return [business, website, faq]
}

export function seo(env: Record<string, string>): Plugin {
  const site = env.VITE_SITE_URL?.replace(/\/+$/, '') || undefined
  return {
    name: 'conceito-seo',
    transformIndexHtml(html) {
      const tags: HtmlTagDescriptor[] = jsonLd(site).map((data) => ({
        tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(data), injectTo: 'head',
      }))
      if (site) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${site}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${site}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: `${site}/og-image.png` }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: `${site}/og-image.png` }, injectTo: 'head' },
        )
      }
      if (env.VITE_GSC_VERIFICATION) {
        tags.push({ tag: 'meta', attrs: { name: 'google-site-verification', content: env.VITE_GSC_VERIFICATION }, injectTo: 'head' })
      }
      const page = html.replace(/__SEO_TITLE__/g, TITLE).replace(/__SEO_DESCRIPTION__/g, DESCRIPTION)
      return { html: page, tags }
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', site ? `\nSitemap: ${site}/sitemap.xml` : ''].join('\n')
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.trim()}\n` })
      if (site) {
        const today = new Date().toISOString().slice(0, 10)
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>${site}/privacidade</loc><lastmod>${today}</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>${site}/cookies</loc><lastmod>${today}</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>
</urlset>
`
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      } else {
        this.warn('VITE_SITE_URL não definido: canonical, og:url, og:image e sitemap.xml não foram gerados.')
      }
    },
  }
}

