import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // Use '/' as standard base for Hostinger and custom domains.
  // If explicitly deploying to GitHub Pages, BASE_PATH or GITHUB_REPOSITORY will be respected.
  const base = process.env.BASE_PATH || (process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : '/');

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'filter-html-preload',
        transformIndexHtml(html) {
          // Remove vendor-motion from critical initial HTML head preloads to maximize mobile PageSpeed
          return html.replace(/<link rel="modulepreload"[^>]*vendor-motion[^>]*>\s*/g, '');
        },
      },
    ],
    build: {
      target: 'esnext',
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/motion')) {
              return 'vendor-motion';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons';
            }
          },
        },
      },
    },

    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
