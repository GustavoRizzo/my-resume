/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// Under Vitest the React Router plugin can't be used (it owns the app entry),
// so we fall back to the plain React SWC plugin for component tests.
const isTest = process.env.NODE_ENV === 'test' || process.env.VITEST

export default defineConfig({
  base: "/my-resume/",
  plugins: isTest ? [react()] : [reactRouter()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
