import { computed } from 'vue'
import { usePreferences } from '@/composables/support/preferences'
import { useQueryParam } from '@shared/composables/support/useQueryParam'
import { useSettingsStore } from '@shared/stores/settings'

export function useUserParams() {
  const settings = useSettingsStore()

  const preferences = usePreferences()

  const page = useQueryParam('page', { default: 1 })
  const search = useQueryParam<string>('search', { min: settings.data.searchMinLength, replace: true })

  // Sort is owned by preferences, but changing it still has to land on the
  // first page, which the query params get for free and this does not.
  const sortBy = computed({
    get: () => preferences.usersSortBy.value,
    set: (value) => {
      preferences.usersSortBy.value = value
      page.value = 1
    },
  })

  const sortDir = computed({
    get: () => preferences.usersSortDir.value,
    set: (value) => {
      preferences.usersSortDir.value = value
      page.value = 1
    },
  })

  return { page, search, sortBy, sortDir }
}

export type UserParams = ReturnType<typeof useUserParams>
