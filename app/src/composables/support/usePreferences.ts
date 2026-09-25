import { computed } from 'vue'
import { useUpdatePreferences } from '@/composables/api/preferences'
import { useAuthStore } from '@shared/stores/auth'
import { useSettingsStore } from '@shared/stores/settings'
import type { BookmarkView } from '@/models/bookmark'

/**
 * Every preference backed value, as a writable computed. Reads fall back
 * through the stored preference to config. Writes hit the store before the
 * request so the UI moves without waiting on the server.
 */
export function usePreferences() {
  const auth = useAuthStore()
  const settings = useSettingsStore()

  const { mutate: updatePreferences } = useUpdatePreferences()

  const bookmarksSortBy = computed({
    get: () => auth.user?.preferences.bookmarksSortBy ?? settings.data.defaultBookmarksSortBy,
    set: (value) => {
      if (auth.user) auth.user.preferences.bookmarksSortBy = value
      updatePreferences({ bookmarks_sort_by: value })
    },
  })

  const bookmarksSortDir = computed({
    get: () => auth.user?.preferences.bookmarksSortDir ?? settings.data.defaultBookmarksSortDir,
    set: (value) => {
      if (auth.user) auth.user.preferences.bookmarksSortDir = value
      updatePreferences({ bookmarks_sort_dir: value })
    },
  })

  const bookmarksView = computed({
    get: () => auth.user?.preferences.bookmarksView ?? settings.data.defaultBookmarksView as BookmarkView,
    set: (value) => {
      if (auth.user) auth.user.preferences.bookmarksView = value
      updatePreferences({ bookmarks_view: value })
    },
  })

  return { bookmarksSortBy, bookmarksSortDir, bookmarksView }
}
