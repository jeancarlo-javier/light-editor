import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

const path = require('path');
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src/app.jsx'),
      name: 'LightEditor',
      fileName: () => 'index.js',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'react',
        },
      },
    },
  },
});
