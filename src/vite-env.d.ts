/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Domínio oficial do site, ex.: https://www.seudominio.com.br */
  readonly VITE_SITE_URL?: string
  /** ID do Google Analytics 4, ex.: G-XXXXXXXXXX */
  readonly VITE_GA_ID?: string
  /** Código de verificação do Google Search Console (opcional) */
  readonly VITE_GSC_VERIFICATION?: string
}
interface ImportMeta { readonly env: ImportMetaEnv }
