import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis' // Define global as globalThis for browsers
  },
  resolve: {
    alias: {
      // Ensure correct resolution of modules
      randombytes: 'randombytes/browser', // Resolve randombytes for browser usage
    },
  },
});
