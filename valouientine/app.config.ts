import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    ssr: true,
    server: {
      baseURL: process.env.BASE_PATH,
      preset:  "static"
    },
  vite: {
    plugins: [tailwindcss()]
  }
});
