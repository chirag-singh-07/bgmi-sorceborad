import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // Explicitly set public directory
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
