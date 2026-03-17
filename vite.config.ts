import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/thansohoc-webapp/', // Quan trọng cho deploy Vercel
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  build: {
    outDir: 'dist', // Đảm bảo output folder là dist
    emptyOutDir: true // Xóa dist cũ trước khi build
  }
});
