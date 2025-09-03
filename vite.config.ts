import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// For https://USERNAME.github.io/REPO/ use base: "/REPO/" in production
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/KnowYourRights/" : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean) as any,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));