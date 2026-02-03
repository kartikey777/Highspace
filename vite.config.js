import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// For GitHub Pages: repo is served at https://<user>.github.io/<repo-name>/
// Set VITE_BASE_PATH=/<repo-name>/ in the deploy workflow (or base defaults to / for local dev)
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
})
