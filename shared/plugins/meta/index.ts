import type { App } from "vue"
import { createHead } from "@unhead/vue/client"

let instance: ReturnType<typeof createHead>

/**
 * Registers unhead for managing the document title and meta tags. Holds the instance so it can be reached from non component code through useMeta.
 */
function createMeta(app: App) {
  instance = createHead()

  app.use(instance)
}

function useMeta() {
  return instance
}

export { createMeta, useMeta }
