import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite 基础配置：React 单页应用
export default defineConfig({
  plugins: [react()],
  publicDir: 'static',
  server: {
    port: 5173
  }
});


