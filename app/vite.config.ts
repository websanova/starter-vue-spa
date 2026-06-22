import checker from "vite-plugin-checker"
import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath, URL } from "node:url"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_")

  return {
    plugins: [
      vue(),
      tailwindcss(),
      checker({ vueTsc: true })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@routes": fileURLToPath(new URL("./src/routes", import.meta.url)),
        "@shared": fileURLToPath(new URL("../shared", import.meta.url))
      }
    },
    server: {
      host: env.VITE_HOST || "0.0.0.0",
      port: Number(env.VITE_PORT) || 5173,
      watch: {
        usePolling: true,
        interval: 500,
        ignored: ["**/node_modules/**", "**/.git/**", "**/dist/**"]
      }
    }
  }
})