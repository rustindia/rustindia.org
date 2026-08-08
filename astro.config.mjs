import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://rustindia.org",
  redirects: {
    "/socials": "/community",
    "/schedule": "/past-events/2026",
    "/sponsors": "/past-events/2026",
    "/jobs": "/past-events/2026",
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
