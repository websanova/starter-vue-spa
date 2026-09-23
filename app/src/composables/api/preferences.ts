import { useMutation } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { useAuthStore } from '@shared/stores/auth'
import { toAuthPreferences } from '@/models/auth'
import type { AuthPreferencesDto } from '@/models/auth'
import type { BookmarkView } from '@/models/bookmark'

interface UpdatePreferencesData {
  bookmarks_sort_by?: string
  bookmarks_sort_dir?: string
  bookmarks_view?: BookmarkView
}

export function useUpdatePreferences() {
  const store = useAuthStore()
  return useMutation({
    mutationFn: (data: UpdatePreferencesData) => useHttp().patch<{ data: AuthPreferencesDto }>('preferences', data),
    onSuccess: ({ data }) => {
      if (store.user) store.user.preferences = toAuthPreferences(data)
    },
  })
}
