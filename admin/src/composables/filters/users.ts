import { computed } from 'vue'
import { useQueryParam } from '@shared/composables/support/useQueryParam'
import { useSettingsStore } from '@shared/stores/settings'
import type { UserFilters } from '@/models/user'

export function useUserFilters() {
  const settings = useSettingsStore()

  const page = useQueryParam('page', { default: 1 })
  const search = useQueryParam<string>('search', { min: settings.data.searchMinLength, replace: true })
  const sortBy = useQueryParam('sort_by', { default: settings.data.defaultUsersSortBy })
  const sortDir = useQueryParam('sort_dir', { default: settings.data.defaultUsersSortDir })

  const filters = computed<UserFilters>(() => ({
    page: page.value,
    search: search.value,
    sort_by: sortBy.value,
    sort_dir: sortDir.value,
  }))

  return { filters, page, search, sortBy, sortDir }
}
