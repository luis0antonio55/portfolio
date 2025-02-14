// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://luis0antonio55.github.io',
  base: 'portfolio',
  integrations: [tailwind(), react()]
});