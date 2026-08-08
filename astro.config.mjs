import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://rustindia.org",
  redirects: {
    "/events": "/archive/schedule",
    "/schedule": "/archive/schedule",
    "/sponsors": "/archive/sponsors",
    "/past-events/2026": "/archive/2026",
    "/past-events": "/archive",
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
