import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Link previews (WhatsApp, LinkedIn…) need an absolute og:image URL.
 * On Netlify, `URL` is the site's main address, so this follows any rename
 * or custom domain automatically. Locally it stays relative.
 */
function absoluteOgImage(): Plugin {
  const site = (process.env.URL ?? '').replace(/\/$/, '')
  return {
    name: 'absolute-og-image',
    transformIndexHtml: (html) =>
      site ? html.replace(/content="\/og\.png"/, `content="${site}/og.png"`).replace('<!--og:url-->', `<meta property="og:url" content="${site}/" />`) : html,
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), absoluteOgImage()],
})
