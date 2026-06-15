import type { App } from "vue"
import { createRouter as createVueRouter, createWebHistory, type Router } from "vue-router"
import routes from "@routes"

let instance: Router

/**
* Builds the router from the app supplied routes. Shared guards register here
* in order once they exist. The instance is exposed through useRouter for
* navigation in non component code.
*/
function createRouter(app: App) {
  instance = createVueRouter({
    history: createWebHistory(),
    routes
  })

  app.use(instance)
}

function useRouter() {
  return instance
}

export { createRouter, useRouter }
