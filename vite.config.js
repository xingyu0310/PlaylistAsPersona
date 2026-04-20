import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project site: https://<user>.github.io/<repo>/
// Production build must use /<repo>/ so asset URLs resolve correctly.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/PlaylistAsPersona/' : '/',
  plugins: [react()],
}));
