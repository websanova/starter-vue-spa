import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toPlan } from '@/models/plan'
import { toPaginationMeta } from '@shared/models/pagination'
import type { PlanParams } from '@/composables/params/usePlanParams'
import type { PlanDto } from '@/models/plan'
import type { PaginationMetaDto } from '@shared/models/pagination'

const key = ['plans']

export function usePlans(params: PlanParams) {
  return useQuery({
    queryKey: [...key, params],
    queryFn: async () => {
      const { data, meta } = await useHttp().get<{ data: PlanDto[], meta: PaginationMetaDto }>('plans', {
        params: {
          page: params.page.value,
        },
      })
      return {
        plans: data.map(toPlan),
        meta: toPaginationMeta(meta),
      }
    },
    placeholderData: keepPreviousData,
  })
}
