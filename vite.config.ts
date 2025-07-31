import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Futuristic_Album_Gallery/", // 👈 Required for GitHub Pages
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
