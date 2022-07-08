import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@view': resolve(__dirname, 'src/view')
    }
  },
  plugins: [vue()]
});
