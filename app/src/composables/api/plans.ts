import { useQuery } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toPlan } from '@/models/plan'
import type { PlanDto } from '@/models/plan'

const key = ['plans']

export function usePlans() {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await useHttp().get<{ data: PlanDto[] }>('plans')
      return data.map(toPlan)
    },
    staleTime: Infinity,
  })
}
