import { useQuery } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toTag } from '@/models/tag'
import type { TagDto } from '@/models/tag'

const key = ['tags']

export function useTags() {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await useHttp().get<{ data: TagDto[] }>('tags')
      return data.map(toTag)
    },
  })
}
