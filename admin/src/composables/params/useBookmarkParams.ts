import { useQueryParam } from '@shared/composables/support/useQueryParam'
import { useSettingsStore } from '@shared/stores/settings'

export function useBookmarkParams() {
  const settings = useSettingsStore()

  const page = useQueryParam('page', { default: 1 })
  const search = useQueryParam<string>('search', { min: settings.data.searchMinLength, replace: true })

  return { page, search }
}

export type BookmarkParams = ReturnType<typeof useBookmarkParams>
