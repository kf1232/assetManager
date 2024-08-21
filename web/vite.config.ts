import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 2423,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/mydomain.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/mydomain.crt')),
    }
  }
});