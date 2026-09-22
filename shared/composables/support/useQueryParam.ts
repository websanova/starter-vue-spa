import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { WritableComputedRef } from 'vue'
import type { LocationQueryRaw } from 'vue-router'

type QueryParamOptions<T> = {
  default?: T
  min?: number
  replace?: boolean
}

/**
 * A single list param kept in the route query, so the components on a page
 * read and write the same value without syncing. A value matching the
 * default drops back out of the query to keep the URL clean.
 */
export function useQueryParam<T extends string | number>(key: string, options: QueryParamOptions<T> & { default: T }): WritableComputedRef<T>
export function useQueryParam<T extends string | number>(key: string, options?: QueryParamOptions<T>): WritableComputedRef<T | undefined>
export function useQueryParam<T extends string | number>(key: string, options: QueryParamOptions<T> = {}) {
  const route = useRoute()
  const router = useRouter()

  return computed<T | undefined>({
    get: () => {
      const value = route.query[key] as string | undefined

      // A hand typed value under the minimum reads as unset, so it never
      // reaches an API that rejects it.
      if (!value || (options.min && value.length < options.min)) {
        return options.default
      }

      if (typeof options.default === 'number') {
        return (Number(value) || options.default) as T
      }

      return value as T
    },
    set: (value) => {
      const query: LocationQueryRaw = {
        ...route.query,
        [key]: !value || value === options.default ? undefined : value,
      }

      // Any other param changing always lands on the first page of its own results.
      if (key !== 'page') {
        query.page = undefined
      }

      // Replace so typing doesn't stack a history entry per keystroke.
      if (options.replace) {
        router.replace({ query })
        return
      }

      router.push({ query })
    },
  })
}
