import { computed } from 'vue'
import { useUpdatePreferences } from '@/composables/api/preferences'
import { useQueryParam } from '@shared/composables/support/useQueryParam'
import { useAuthStore } from '@shared/stores/auth'
import { useSettingsStore } from '@shared/stores/settings'

export function useBookmarkParams() {
  const auth = useAuthStore()
  const settings = useSettingsStore()

  const { mutate: updatePreferences } = useUpdatePreferences()

  const page = useQueryParam('page', { default: 1 })
  const search = useQueryParam<string>('search', { min: settings.data.searchMinLength, replace: true })
  const tagId = useQueryParam<string>('tag_id')

  // Sort is a stored preference rather than a route param. The store is written
  // before the request so the list re-sorts without waiting on the server, and
  // the page reset the query params get for free has to be done by hand.
  const sortBy = computed({
    get: () => auth.user?.preferences.bookmarksSortBy ?? settings.data.defaultBookmarksSortBy,
    set: (value) => {
      if (auth.user) auth.user.preferences.bookmarksSortBy = value
      page.value = 1
      updatePreferences({ bookmarks_sort_by: value })
    },
  })

  const sortDir = computed({
    get: () => auth.user?.preferences.bookmarksSortDir ?? settings.data.defaultBookmarksSortDir,
    set: (value) => {
      if (auth.user) auth.user.preferences.bookmarksSortDir = value
      page.value = 1
      updatePreferences({ bookmarks_sort_dir: value })
    },
  })

  return { page, search, sortBy, sortDir, tagId }
}

export type BookmarkParams = ReturnType<typeof useBookmarkParams>
