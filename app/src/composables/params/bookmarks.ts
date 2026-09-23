import { useQueryParam } from '@shared/composables/support/useQueryParam'
import { useSettingsStore } from '@shared/stores/settings'

export function useBookmarkParams() {
  const settings = useSettingsStore()

  const page = useQueryParam('page', { default: 1 })
  const search = useQueryParam<string>('search', { min: settings.data.searchMinLength, replace: true })
  const sortBy = useQueryParam('sort_by', { default: settings.data.defaultBookmarksSortBy })
  const sortDir = useQueryParam('sort_dir', { default: settings.data.defaultBookmarksSortDir })
  const tagId = useQueryParam<string>('tag_id')

  return { page, search, sortBy, sortDir, tagId }
}

export type BookmarkParams = ReturnType<typeof useBookmarkParams>
