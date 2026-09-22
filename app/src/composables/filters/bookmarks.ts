import { computed } from 'vue'
import { useQueryParam } from '@shared/composables/support/useQueryParam'
import { useSettingsStore } from '@shared/stores/settings'
import type { BookmarkFilters } from '@/models/bookmark'

export function useBookmarkFilters() {
  const settings = useSettingsStore()

  const page = useQueryParam('page', { default: 1 })
  const search = useQueryParam<string>('search', { min: settings.data.searchMinLength, replace: true })
  const tagId = useQueryParam<string>('tag_id')

  const filters = computed<BookmarkFilters>(() => ({
    page: page.value,
    search: search.value,
    tag_id: tagId.value,
  }))

  return { filters, page, search, tagId }
}
