import type { App } from "vue"
import { createRouter as createVueRouter, createWebHistory, type Router } from "vue-router"

// import * as auth from './interceptors/auth.js'
// import * as i18n from './interceptors/i18n.js'
import * as content from './interceptors/content'
import * as i18n from './interceptors/i18n'
import * as preload from './interceptors/preload'
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

  instance.beforeEach(preload.beforeEach)
  instance.beforeEach(i18n.beforeEach)
  // instance.beforeEach(auth.beforeEach)
  instance.beforeEach(content.beforeEach)
  instance.afterEach(content.afterEach)
  // instance.afterEach(scrollToTop.afterEach)

  app.use(instance)
}

function useRouter() {
  return instance
}

export { createRouter, useRouter }
