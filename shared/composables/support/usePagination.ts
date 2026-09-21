import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSettingsStore } from '@shared/stores/settings'

/**
 * Common list params kept in the route query, so the list and
 * LoadPaginate read and write the same values without syncing.
 */
export function usePagination() {
  const route = useRoute()
  const router = useRouter()

  const settings = useSettingsStore()

  const page = computed({
    get: () => Number(route.query.page) || 1,
    set: (value) => router.push({ query: { ...route.query, page: value } }),
  })

  // Replace so typing doesn't stack a history entry per keystroke, and drop
  // the page so a new term always lands on the first page of its own results.
  // A hand typed term under the minimum reads as no search, so it never
  // reaches an API that rejects it.
  const search = computed({
    get: () => {
      const value = route.query.search as string | undefined

      return value && value.length >= settings.data.searchMinLength ? value : undefined
    },
    set: (value) => router.replace({ query: { ...route.query, search: value || undefined, page: undefined } }),
  })

  return { page, search }
}
