/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      thresholds: {
        statements: 96,
        branches: 96,
        functions: 96,
        lines: 96
      },
      exclude: [
        "node_modules",
        "src/main.tsx",
        "src/main.test.tsx",
        "dist/**",
        "build/**",
        "**/*.config.*",
        "public/**",
        "**/*env*",
      ]
    }
  },
})
