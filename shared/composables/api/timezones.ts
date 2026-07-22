import { useQuery } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'

export interface Timezone {
  value: string
  label: string
}

export function useTimezones() {
  return useQuery({
    queryKey: ['timezones'],
    queryFn: async () => {
      const { data } = await useHttp().get<{ data: Timezone[] }>('timezones')
      return data
    },
    staleTime: Infinity,
  })
}
