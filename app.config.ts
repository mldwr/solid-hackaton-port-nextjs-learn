import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  vite: {
    optimizeDeps: {
      exclude: ['@mapbox/node-pre-gyp']
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/]
      }
    }
  }
});
