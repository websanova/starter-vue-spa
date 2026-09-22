import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toUser } from '@/models/user'
import { toPaginationMeta } from '@shared/models/pagination'
import type { UserParams } from '@/composables/params/users'
import type { UserDto } from '@/models/user'
import type { PaginationMetaDto } from '@shared/models/pagination'
import type { Ref } from 'vue'

const key = ['users']

export function useUsers(params: UserParams) {
  return useQuery({
    queryKey: [...key, params],
    queryFn: async () => {
      const { data, meta } = await useHttp().get<{ data: UserDto[], meta: PaginationMetaDto }>('users', {
        params: {
          page: params.page.value,
          search: params.search.value,
          sort_by: params.sortBy.value,
          sort_dir: params.sortDir.value,
        },
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

export function useUpdateUser(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: { first_name: string, last_name: string }) => useHttp().patch(`users/${id}`, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  })
}

export function useDeleteUser(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: { email: string }) => useHttp().delete(`users/${id}`, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  })
}
