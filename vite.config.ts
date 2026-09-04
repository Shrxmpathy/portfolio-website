import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base` controls the URL prefix for built assets.
// Vercel / Netlify / custom domain -> leave BASE_PATH unset.
// GitHub Pages project site -> set BASE_PATH=/<repo-name>/ before building.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
})
