import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { canonicalURL, PAGE_METADATA } from './src/seo.js'

const projectDirectory = dirname(fileURLToPath(import.meta.url))

function updateMeta(html, selector, value) {
  return html.replace(selector, `$1${value}$2`)
}

function staticRouteMetadata() {
  return {
    name: 'static-route-metadata',
    apply: 'build',
    async closeBundle() {
      const outputDirectory = resolve(projectDirectory, 'dist')
      const indexHTML = await readFile(resolve(outputDirectory, 'index.html'), 'utf8')

      await Promise.all(
        Object.entries(PAGE_METADATA)
          .filter(([pathname]) => pathname !== '/')
          .map(async ([pathname, metadata]) => {
            const pageURL = canonicalURL(pathname)
            let html = indexHTML.replace(/<title>.*?<\/title>/, `<title>${metadata.title}</title>`)

            html = updateMeta(html, /(<meta name="title" content=")[^"]*(" \/>)/, metadata.title)
            html = updateMeta(html, /(<meta name="description" content=")[^"]*(" \/>)/, metadata.description)
            html = html.replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${pageURL}$2`)
            html = updateMeta(html, /(<meta property="og:url" content=")[^"]*(" \/>)/, pageURL)
            html = updateMeta(html, /(<meta property="og:title" content=")[^"]*(" \/>)/, metadata.title)
            html = updateMeta(html, /(<meta property="og:description" content=")[^"]*(" \/>)/, metadata.description)
            html = updateMeta(html, /(<meta property="twitter:url" content=")[^"]*(" \/>)/, pageURL)
            html = updateMeta(html, /(<meta property="twitter:title" content=")[^"]*(" \/>)/, metadata.title)
            html = updateMeta(html, /(<meta property="twitter:description" content=")[^"]*(" \/>)/, metadata.description)

            const routeDirectory = resolve(outputDirectory, pathname.slice(1))
            await mkdir(routeDirectory, { recursive: true })
            await writeFile(resolve(routeDirectory, 'index.html'), html)
          }),
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticRouteMetadata()],
  server: { port: 5173, host: true },
})
