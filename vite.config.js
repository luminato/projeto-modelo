import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@styles': path.resolve(__dirname, 'src/assets/styles'),
      '@img': path.resolve(__dirname, 'src/assets/img'),
    },
  },
});
