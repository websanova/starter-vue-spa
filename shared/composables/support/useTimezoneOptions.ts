import { computed } from 'vue'
import { useTimezones } from '@shared/composables/api/timezones'

export function useTimezoneOptions() {
  const { data } = useTimezones()

  return computed(() => data.value ?? [])
}
