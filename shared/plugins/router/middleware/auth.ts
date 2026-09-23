import { useAuthService } from '@shared/composables/services/auth'
import type { RouteLocationNormalized, RouteLocationRaw, RouteMeta } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    auth?: {
      roles: boolean | string[]
      redirect: RouteLocationRaw
    }
  }
}

/**
 * Enforces the auth meta of the matched route, merged across all matched
 * records. Three scenarios drive the redirect: roles false is a guest
 * only route and redirects when logged in, roles true requires any
 * authenticated user and redirects when logged out, and a roles array
 * requires the user role to be listed and redirects otherwise.
 */
export function beforeEach(to: RouteLocationNormalized): RouteLocationRaw | undefined {
  const auth = useAuthService()

  let meta: RouteMeta['auth'] | undefined

  // Combine all the "auth" meta (they should all be objects).
  to.matched.forEach((matched) => {
    if (matched.meta.auth) {
      meta = Object.assign({}, meta, matched.meta.auth)
    }
  })

  if (!meta) {
    return
  }

  // NOTE: There should always be a redirect when setting these in the route
  //       meta otherwise it will just get redirected and then get picked up by
  //       the http interrupts likely resulting in 401.
  if ((
    meta.roles === false &&
    auth.isLoggedIn.value
  ) || (
    meta.roles === true &&
    !auth.isLoggedIn.value
  ) || (
    Array.isArray(meta.roles) &&
    !meta.roles.includes(auth.user.value?.role as string)
  )) {
    return meta.redirect
  }
}
