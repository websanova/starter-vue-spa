import type { RouteLocationNormalized } from "vue-router"
import { useContentStore } from "@core/stores/core/useContentStore"

declare module "vue-router" {
  interface RouteMeta {
    content?: {
      site?: string
      layout?: string
      page?: string
    }
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

  let toObj = {site: undefined, layout: undefined, page: to.name}
  let frObj = {site: undefined, layout: undefined, page: from.name}

  to.matched.forEach((obj) => { toObj = Object.assign(toObj, obj.meta.content || {}) })
  from.matched.forEach((obj) => { frObj = Object.assign(frObj, obj.meta.content || {}) })

  content.setIsLayoutLoaded(frObj.layout === toObj.layout)
  content.setIsPageLoaded(frObj.page === toObj.page)
  content.setIsSiteLoaded(frObj.site === toObj.site)

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
