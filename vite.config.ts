import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: 'https://github.com/jKnaebe/sudoku-solver/',
  plugins: [
    tailwindcss()
  ],
})
