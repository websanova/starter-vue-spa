import type { App } from "vue"
import { createRouter as createVueRouter, createWebHistory, type NavigationGuard, type NavigationHookAfter, type Router } from "vue-router"

import * as auth from './interceptors/auth'
import * as content from './interceptors/content'
import * as i18n from './interceptors/i18n'
import * as ready from './interceptors/ready'
import { scrollBehavior } from './scrollBehavior'

import interceptors from "@router/interceptors"
import routes from "@router/routes"

/**
 * Shape an app level interceptor module exports. Both hooks are optional
 * so a module only declares the ones it uses.
 */
export interface RouterInterceptor {
  afterEach?: NavigationHookAfter
  beforeEach?: NavigationGuard
}

let instance: Router

/**
 * The instance is exposed through useRouter so non component code can
 * navigate.
 */
function createRouter(app: App) {
  instance = createVueRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior
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

  // App level guards. Registered last so they can depend on everything the
  // shared chain resolved.
  interceptors.forEach((interceptor) => {
    if (interceptor.beforeEach) {
      instance.beforeEach(interceptor.beforeEach)
    }

    if (interceptor.afterEach) {
      instance.afterEach(interceptor.afterEach)
    }
  })

  app.use(instance)
}

function useRouter() {
  return instance
}

export { createRouter, useRouter }
