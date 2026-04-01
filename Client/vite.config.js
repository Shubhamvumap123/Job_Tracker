import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss()
  ],
  server: {
    proxy: {
      '/api/auth': {
        target: 'http://localhost:5001',
        changeOrigin: true
      },
      '/api/tickets': {
        target: 'http://localhost:5002',
        changeOrigin: true
      },
      '/socket.io': {
        target: 'http://localhost:5003',
        ws: true,
        changeOrigin: true
      }
    }
  }
})
