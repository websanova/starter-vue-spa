import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toUser } from '@/models/user'
import { toPaginationMeta } from '@shared/models/pagination'
import type { UserDto, UserFilters } from '@/models/user'
import type { PaginationMetaDto } from '@shared/models/pagination'
import type { Ref } from 'vue'

const key = ['users']

export function useUsers(filters: Ref<UserFilters>) {
  return useQuery({
    queryKey: [...key, filters],
    queryFn: async () => {
      const { data, meta } = await useHttp().get<{ data: UserDto[], meta: PaginationMetaDto }>('users', {
        params: filters.value,
      })
      return {
        users: data.map(toUser),
        meta: toPaginationMeta(meta),
      }
    },
    placeholderData: keepPreviousData,
  })
}

export function useUser(id: Ref<number>) {
  return useQuery({
    queryKey: [...key, id],
    queryFn: async () => {
      const { data } = await useHttp().get<{ data: UserDto }>(`users/${id.value}`)
      return toUser(data)
    },
  })
}

export function useDeleteUser(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: { email: string }) => useHttp().delete(`users/${id}`, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  })
}
