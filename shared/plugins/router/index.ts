import type { App } from "vue"
import { createRouter as createVueRouter, createWebHistory, type Router } from "vue-router"

// import * as i18n from './interceptors/i18n.js'
import * as auth from './interceptors/auth'
import * as content from './interceptors/content'
import * as i18n from './interceptors/i18n'
import * as ready from './interceptors/ready'
// import * as scrollToTop from './interceptors/scrollToTop.js'

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

  // Non-blocking loaders. Registered above the ready gate so their fetches
  // start immediately instead of stalling behind its await.
  instance.beforeEach(i18n.beforeEach)
  instance.beforeEach(content.beforeEach)
  instance.afterEach(content.afterEach)

  // Ready gate. Blocks until auth and settings resolve, since the app cannot
  // drop its loading covers without them. Non-blocking preloads go above;
  // additional blocking work goes inside ready itself.
  instance.beforeEach(ready.beforeEach)

  // Post-ready guards. Depend on the state ready resolved (auth roles, etc).
  instance.beforeEach(auth.beforeEach)
  // instance.afterEach(scrollToTop.afterEach)

  app.use(instance)
}

function useRouter() {
  return instance
}

export { createRouter, useRouter }
