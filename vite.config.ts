import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { seo } from './seo.config.ts'

export default defineConfig(({ mode }) => ({
  plugins: [react(), seo(loadEnv(mode, '.', 'VITE_'))],
}))
