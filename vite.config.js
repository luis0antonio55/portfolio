import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: ["startup-valves-static-gm.trycloudflare.com"]
  }
});
