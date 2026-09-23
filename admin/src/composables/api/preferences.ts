import { useMutation } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { useAuthStore } from '@shared/stores/auth'
import { toAuthPreferences } from '@/models/auth'
import type { AuthPreferencesDto } from '@/models/auth'

interface UpdatePreferencesData {
  users_sort_by?: string
  users_sort_dir?: string
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
