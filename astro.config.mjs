import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: false,
  }),],
  vite: {
    build: {
      chunkSizeWarningLimit: 750,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/three/")) {
              return "three-core";
            }
            if (id.includes("node_modules/postprocessing/") || id.includes("node_modules/@react-three/postprocessing/")) {
              return "three-postprocessing";
            }
            if (id.includes("node_modules/@react-three/")) {
              return "three-ecosystem";
            }
          },
        },
      },
    },
  },
});
