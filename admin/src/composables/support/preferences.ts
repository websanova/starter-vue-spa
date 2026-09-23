import { computed } from 'vue'
import { useUpdatePreferences } from '@/composables/api/preferences'
import { useAuthStore } from '@shared/stores/auth'
import { useSettingsStore } from '@shared/stores/settings'

/**
 * Every preference backed value, as a writable computed. Reads fall back
 * through the stored preference to config. Writes hit the store before the
 * request so the UI moves without waiting on the server.
 */
export function usePreferences() {
  const auth = useAuthStore()
  const settings = useSettingsStore()

  const { mutate: updatePreferences } = useUpdatePreferences()

  const usersSortBy = computed({
    get: () => auth.user?.preferences.usersSortBy ?? settings.data.defaultUsersSortBy,
    set: (value) => {
      if (auth.user) auth.user.preferences.usersSortBy = value
      updatePreferences({ users_sort_by: value })
    },
  })

  const usersSortDir = computed({
    get: () => auth.user?.preferences.usersSortDir ?? settings.data.defaultUsersSortDir,
    set: (value) => {
      if (auth.user) auth.user.preferences.usersSortDir = value
      updatePreferences({ users_sort_dir: value })
    },
  })

  return { usersSortBy, usersSortDir }
}
