import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'   // ✅ new Tailwind v4 plugin

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],   // ✅ enable TailwindCSS for all CSS
    },
  },
})
