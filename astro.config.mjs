// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  site: 'https://yearofthebuild.xyz',
  vite: {
    // Dedupe React to prevent multiple instances when using linked packages
    resolve: {
      dedupe: ['react', 'react-dom', 'framer-motion'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion'],
    },
  },
});
