import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@views': resolve(__dirname, 'src/views'),
      '@apis': resolve(__dirname, 'src/apis')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.less']
  },
  plugins: [vue()],
  server: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://192.168.0.101:9000',
        rewrite: path => path.replace(/^\/api/, ''),
        secure: false
      }
    }
  }
});
