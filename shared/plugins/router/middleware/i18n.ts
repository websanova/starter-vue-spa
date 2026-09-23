import type { RouteLocationNormalized } from "vue-router"
import { useI18nService } from "@shared/composables/services/i18n"
import type { I18nTier } from "@shared/stores/i18n"

declare module "vue-router" {
  interface RouteMeta {
    i18n?: Partial<Record<I18nTier, string[]>>
  }
}

/**
 * Accumulates the i18n files declared per tier across every matched
 * route, then hands the merged set to i18n.load for fetching.
 */
export function beforeEach(to: RouteLocationNormalized): void {
  const i18n = useI18nService()

  const files: Partial<Record<I18nTier, string[]>> = { layout: [], page: [], site: [] }

  to.matched.forEach((record) => {
    const meta = record.meta.i18n

    files.layout = files.layout!.concat(meta?.layout || [])
    files.page = files.page!.concat(meta?.page || [])
    files.site = files.site!.concat(meta?.site || [])
  })

  i18n.load(files)
}
