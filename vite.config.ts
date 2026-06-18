import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    fs: {
      strict: false,
      allow: [
        path.resolve(__dirname),
        path.resolve(__dirname, '..'),
        '/Users/shivamvarma/projects/web',
      ],
    },
  },
})
