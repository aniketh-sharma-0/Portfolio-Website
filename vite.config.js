import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Unique timestamp per build to guarantee cache busting on mobile and CDN
const buildTime = Date.now().toString(36)

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp'],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash]-${buildTime}.js`,
        chunkFileNames: `assets/[name]-[hash]-${buildTime}.js`,
        assetFileNames: `assets/[name]-[hash]-${buildTime}.[ext]`,
      },
    },
  },
})

