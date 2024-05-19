import { defineConfig } from '@solidjs/start/config';
import UnoCSS from 'unocss/vite';

const isNodejs =
  typeof process !== 'undefined' &&
  typeof process.versions !== null &&
  typeof process.versions.node !== null;

export default defineConfig({
  vite: {
    plugins: [UnoCSS()],
  },
  server: {
    preset: isNodejs ? 'node-server' : 'deno-server',
  },
});
