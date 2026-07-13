import checker from "vite-plugin-checker"
import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath, URL } from "node:url"
import { initCover } from "../vite/init-cover-plugin"

const buildId = Date.now().toString(36)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_")

  return {
    define: {
      __I18N_VERSION__: JSON.stringify(buildId)
    },
    plugins: [
      vue(),
      tailwindcss(),
      checker({ vueTsc: true }),
      initCover()
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
      port: Number(env.VITE_PORT) || 5174,
      watch: {
        usePolling: true,
        interval: 500,
        ignored: ["**/node_modules/**", "**/.git/**", "**/dist/**"]
      }

    }
  }
})
