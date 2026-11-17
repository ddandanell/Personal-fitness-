import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin, type ViteDevServer } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

function enquiryDevApi(): Plugin {
  return {
    name: 'enquiry-dev-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        if (!url.startsWith('/api/enquiry')) { next(); return }
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, code: 'invalid', error: 'Method not allowed' }))
          return
        }
        try {
          const raw = await readRequest(req)
          const loaded = await server.ssrLoadModule('/src/server/enquiry.ts') as {
            handleEnquiry: (body: unknown, options: { ip?: string; origin?: string; referer?: string }) => Promise<{ status: number; body: unknown }>
          }
          const result = await loaded.handleEnquiry(raw.length > 20000 ? null : safeJson(raw), {
            ip: req.socket.remoteAddress || '',
            origin: req.headers.origin,
            referer: typeof req.headers.referer === 'string' ? req.headers.referer : undefined,
          })
          res.statusCode = result.status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result.body))
        } catch {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, code: 'send_failed' }))
        }
      })
    },
  }
}

function readRequest(req: NodeJS.ReadableStream) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer | string) => chunks.push(Buffer.from(chunk)))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function safeJson(raw: string): unknown {
  if (!raw) return {}
  try { return JSON.parse(raw) } catch { return null }
}

export default defineConfig({
  base: '/',
  plugins: [
    enquiryDevApi(),
    react(),
    VitePWA({
      selfDestroying: true,
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png', 'icons/favicon-64.png', 'favicon.ico', 'brand/personalfitness-mark.png'],
      manifest: {
        name: 'PersonalFitness.id - Fitness and Wellness at Your Location',
        short_name: 'PersonalFitness',
        description: 'Private fitness and wellness coordinated for your home or villa in Bali and Jakarta.',
        theme_color: '#1b1b1b',
        background_color: '#ededed',
        display: 'standalone',
        start_url: 'https://www.personalfitness.id/',
        scope: '/',
        id: 'https://www.personalfitness.id/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        navigateFallback: null,
        globPatterns: ['assets/**/*.{js,css}', 'index.html', 'icons/*.{png,svg}', 'manifest.webmanifest'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: { cacheName: 'pf-public-pages-v4-wellness-plans', networkTimeoutSeconds: 3, expiration: { maxEntries: 20, maxAgeSeconds: 86400 } },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  server: { port: 3000, allowedHosts: ['villademo.localhost', 'villademo.personalfitness.id', 'demo.localhost', 'demo.personalfitness.id', 'villas.localhost', 'villas.personalfitness.id'] },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
