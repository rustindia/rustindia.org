import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://rustindia.org",
  redirects: {
    "/events": "/schedule",
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
