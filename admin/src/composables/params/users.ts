import { useQueryParam } from '@shared/composables/support/useQueryParam'
import { useSettingsStore } from '@shared/stores/settings'

export function useUserParams() {
  const settings = useSettingsStore()

  const page = useQueryParam('page', { default: 1 })
  const search = useQueryParam<string>('search', { min: settings.data.searchMinLength, replace: true })
  const sortBy = useQueryParam('sort_by', { default: settings.data.defaultUsersSortBy })
  const sortDir = useQueryParam('sort_dir', { default: settings.data.defaultUsersSortDir })

  return { page, search, sortBy, sortDir }
}

export type UserParams = ReturnType<typeof useUserParams>
