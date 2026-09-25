import { useQueryParam } from '@shared/composables/support/useQueryParam'

export function usePlanParams() {
  const page = useQueryParam('page', { default: 1 })

  return { page }
}

export type PlanParams = ReturnType<typeof usePlanParams>
