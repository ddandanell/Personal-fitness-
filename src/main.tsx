import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'

async function removePreviousSiteCaches() {
  const marker = 'personalfitness-public-site-2026-11-wellness-v3'
  try {
    if (!window.localStorage.getItem(marker) && 'caches' in window) {
      const keys = await window.caches.keys()
      await Promise.all(keys.map((key) => window.caches.delete(key)))
    }
    window.localStorage.setItem(marker, 'done')
  } catch {
    // The site remains fully usable when browser storage is unavailable.
  }
}

void removePreviousSiteCaches().finally(() => registerSW({ immediate: true }))

const root = document.getElementById('root')!
const app = <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>
if (root.dataset.prerendered && root.dataset.prerenderPath === window.location.pathname && !window.location.search) hydrateRoot(root, app)
else createRoot(root).render(app)
