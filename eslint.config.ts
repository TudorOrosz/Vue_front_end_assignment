import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js, '@stylistic/js': stylisticJs },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      // stylistic-js rules you want to enforce
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
    }
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },
  {
    files: ['src/__tests__/**/*.ts', 'src/__tests__/**/*.js'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-prototype-builtins': 'off'
    }
  }
])