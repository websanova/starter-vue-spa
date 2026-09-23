import { useQuery } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'

const key = ['stats']

export function useStats() {
  return useQuery({
    queryKey: key,
    queryFn: () => useHttp().get('stats'),
  })
}
