import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * Common list params kept in the route query, so the list and
 * LoadPaginate read and write the same values without syncing.
 */
export function usePagination() {
  const route = useRoute()
  const router = useRouter()

  const page = computed({
    get: () => Number(route.query.page) || 1,
    set: (value) => router.push({ query: { ...route.query, page: value } }),
  })

  const query = computed({
    get: () => route.query.query as string | undefined,
    set: (value) => router.push({ query: { ...route.query, query: value } }),
  })

  return { page, query }
}
