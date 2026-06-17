import type { RouteLocationNormalized } from "vue-router"
import { useContentStore } from "@shared/stores/core/useContentStore.js"

declare module "vue-router" {
  interface RouteMeta {
    site?: string
    layout?: string
  }
}

/**
* Delay before revealing freshly navigated content. One paint tick lets the
* transition start from the loading state instead of snapping straight to the
* loaded view.
*/
const REVEAL_DELAY = 10

/**
* Marks each load tier loaded only when it is unchanged across the navigation.
* A changed tier flips to false so its transition can play; afterEach flips it
* back to true once the new view paints.
*/
export function beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized): void {
  const content = useContentStore()

  content.setIsLayoutLoaded(from.meta.layout === to.meta.layout)
  content.setIsPageLoaded(from.name === to.name)
  content.setIsSiteLoaded(from.meta.site === to.meta.site)

  if (
    to.path !== from.path &&
    document.documentElement.scrollHeight > document.documentElement.clientHeight
  ) {
    document.documentElement.style.overflowY = "scroll"
  }
}

/**
* Reveals the new content after paint and restores scrolling. Skips the delay
* when the path is unchanged since no tier transition is in flight.
*/
export function afterEach(to: RouteLocationNormalized, from: RouteLocationNormalized): void {
  const content = useContentStore()
  const timeout = from.path !== to.path ? REVEAL_DELAY : 0

  setTimeout(() => {
    document.documentElement.style.overflowY = ""

    content.setIsLayoutLoaded(true)
    content.setIsPageLoaded(true)
    content.setIsSiteLoaded(true)
  }, timeout)
}
