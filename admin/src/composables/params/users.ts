import { computed } from 'vue'
import { useUpdatePreferences } from '@/composables/api/preferences'
import { useQueryParam } from '@shared/composables/support/useQueryParam'
import { useAuthStore } from '@shared/stores/auth'
import { useSettingsStore } from '@shared/stores/settings'

export function useUserParams() {
  const auth = useAuthStore()
  const settings = useSettingsStore()

  const { mutate: updatePreferences } = useUpdatePreferences()

  const page = useQueryParam('page', { default: 1 })
  const search = useQueryParam<string>('search', { min: settings.data.searchMinLength, replace: true })

  // Sort is a stored preference rather than a route param. The store is written
  // before the request so the list re-sorts without waiting on the server, and
  // the page reset the query params get for free has to be done by hand.
  const sortBy = computed({
    get: () => auth.user?.preferences.usersSortBy ?? settings.data.defaultUsersSortBy,
    set: (value) => {
      if (auth.user) auth.user.preferences.usersSortBy = value
      page.value = 1
      updatePreferences({ users_sort_by: value })
    },
  })

  const sortDir = computed({
    get: () => auth.user?.preferences.usersSortDir ?? settings.data.defaultUsersSortDir,
    set: (value) => {
      if (auth.user) auth.user.preferences.usersSortDir = value
      page.value = 1
      updatePreferences({ users_sort_dir: value })
    },
  })

  return { page, search, sortBy, sortDir }
}

export type UserParams = ReturnType<typeof useUserParams>
