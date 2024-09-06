import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/backend': 'https://sih-5.onrender.com',
      '/pdf': 'https://sih-2024-5.onrender.com',
      '/api': 'http://localhost:3000',
    }
  },
  plugins: [react()],
})
