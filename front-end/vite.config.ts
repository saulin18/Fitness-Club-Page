import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && {
      name: 'vite-plugin-html-inject',
      inject: {
        data: {
          devServer: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 8080}`,
          version: process.env.npm_package_version || 'dev',
        },
        tag: 'script',
        file: './src/inject.js',
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
