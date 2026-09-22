import { computed } from 'vue'
import { useQueryParam } from '@shared/composables/support/useQueryParam'
import type { PlanFilters } from '@/models/plan'

export function usePlanFilters() {
  const page = useQueryParam('page', { default: 1 })

  const filters = computed<PlanFilters>(() => ({
    page: page.value,
  }))

  return { filters, page }
}
