import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toTag } from '@/models/tag'
import type { TagDto, TagInput } from '@/models/tag'

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

export function useCreateTag() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: TagInput) => useHttp().post('tags', input),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  })
}
