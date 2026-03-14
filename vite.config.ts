import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  base: '/training-calendar/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tsconfigPaths(),
  ],
});
