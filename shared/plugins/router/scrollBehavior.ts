import type { RouteLocationNormalized, RouterScrollBehavior } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    scroll?: string
  }
}

/**
 * Resolves the scroll group of a route, taking the deepest matched record
 * that declares one. Routes sharing a group keep their scroll position
 * when navigating between each other.
 */
function group(route: RouteLocationNormalized): string | undefined {
  const matched = route.matched.filter((record) => record.meta.scroll)

  if (matched.length) {
    return matched[matched.length - 1].meta.scroll
  }
}

/**
 * Scrolls to the top on navigation. The browser position wins on back and
 * forward, a hash targets its element, and navigations within the same
 * scroll group or to the same path are left alone.
 */
export const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }

  if (to.hash) {
    return {el: to.hash}
  }

  const frGroup = group(from)
  const toGroup = group(to)

  if (frGroup && frGroup === toGroup) {
    return false
  }

  if (to.path === from.path) {
    return false
  }

  return {top: 0}
}
