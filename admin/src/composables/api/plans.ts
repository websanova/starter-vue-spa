import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toPlan } from '@/models/plan'
import { toPaginationMeta } from '@shared/models/pagination'
import type { PlanDto, PlanFilters } from '@/models/plan'
import type { PaginationMetaDto } from '@shared/models/pagination'
import type { Ref } from 'vue'

const key = ['plans']

export function usePlans(filters: Ref<PlanFilters>) {
  return useQuery({
    queryKey: [...key, filters],
    queryFn: async () => {
      const { data, meta } = await useHttp().get<{ data: PlanDto[], meta: PaginationMetaDto }>('plans', {
        params: filters.value,
      })
      return {
        plans: data.map(toPlan),
        meta: toPaginationMeta(meta),
      }
    },
    placeholderData: keepPreviousData,
  })
}
