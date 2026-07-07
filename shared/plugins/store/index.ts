import type { App } from "vue"
import { createPinia, type Pinia } from "pinia"

let instance: Pinia

/**
 * Registers Pinia for client state. Holds the instance so it can be
 * reached from non component code through useStore.
 */
function createStore(app: App) {
  instance = createPinia()
  app.use(instance)
}

function useStore() {
  return instance
}

export { createStore, useStore }
