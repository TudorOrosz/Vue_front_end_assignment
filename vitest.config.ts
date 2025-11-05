import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'

// Ensure the Vue plugin is available to Vitest so single-file components
// (.vue) are parsed correctly during tests.
export default defineConfig({
  plugins: [vue()] as PluginOption[],
  test: {
    environment: 'jsdom',
    exclude: ['tests/e2e/**', 'node_modules/**'],
  },
})