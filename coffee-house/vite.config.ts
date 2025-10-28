import { defineConfig } from 'vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  base: '/', // совпадает с именем репозитория
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions : {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        menu: path.resolve(__dirname, 'menu.html'),
        cart: path.resolve(__dirname, 'cart.html'),
        signin: path.resolve(__dirname, 'signin.html'),
        registration: path.resolve(__dirname, 'registration.html'),
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
});
