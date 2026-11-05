import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// `vite build --mode artifact` produces a relative-path, hash-routed build
// that can be hosted from any folder (used for the live preview).
// A normal `vite build` produces a root-hosted build with clean URLs.
export default defineConfig(({ mode }) => ({
  base: mode === 'artifact' ? './' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 900,
  },
}))
