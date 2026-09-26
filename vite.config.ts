import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa-icon.svg', 'pwa-maskable.svg'],
      manifest: {
        name: 'Nossa Rotina',
        short_name: 'Rotina',
        description: 'A rotina diária de duas pessoas.',
        theme_color: '#f8f6f1',
        background_color: '#f8f6f1',
        display: 'standalone',
        start_url: '/',
        lang: 'pt-BR',
        icons: [
          { src: 'pwa-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: 'pwa-maskable.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' }
        ]
      },
      workbox: { navigateFallback: 'index.html' }
    })
  ]
});
