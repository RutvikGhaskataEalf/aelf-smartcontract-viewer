// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'dev', // Set the root to the `dev` directory
  plugins: [react()],
  server: {
    port: 3200, // You can change the port if needed
  },
});
