import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// Ensure the Vue plugin is available to Vitest so single-file components
// (.vue) are parsed correctly during tests.
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom'
  }
})