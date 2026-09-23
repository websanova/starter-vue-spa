import { useQuery } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toStat, toStatMetrics } from '@/models/stat'
import type { StatDto } from '@/models/stat'

const key = ['stats']

export function useStats() {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await useHttp().get<{ data: StatDto[] }>('stats')
      const stats = data.map(toStat)

      return {
        calculatedAt: stats[0]?.calculatedAt ?? null,
        metrics: toStatMetrics(stats),
      }
    },
  })
}
