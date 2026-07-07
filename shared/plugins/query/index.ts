import type { App } from "vue"
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query"

let instance: QueryClient

/**
 * Registers TanStack Query for server state. Owns the QueryClient and its
 * global defaults so features never configure caching themselves. The
 * instance is exposed through useQueryClient for cache access in non
 * component code.
 */
function createQueryClient(app: App) {
  instance = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60_000, retry: false }
    }
  })

  app.use(VueQueryPlugin, { queryClient: instance })
}

function useQueryClient() {
  return instance
}

export { createQueryClient, useQueryClient }
