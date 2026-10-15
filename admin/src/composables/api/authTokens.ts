import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toAuthToken } from '@/models/authToken'
import { toListMeta } from '@shared/models/list'
import type { AuthTokenDto } from '@/models/authToken'
import type { ListMetaDto } from '@shared/models/list'

const key = ['auth-tokens']

export function useUserAuthTokens(userId: number) {
  return useQuery({
    queryKey: [...key, userId],
    queryFn: async () => {
      const { data, meta } = await useHttp().get<{ data: AuthTokenDto[], meta: ListMetaDto }>(`users/${userId}/auth-tokens`)
      return {
        authTokens: data.map(toAuthToken),
        meta: toListMeta(meta),
      }
    },
  })
}

export function useDeleteAuthToken(userId: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => useHttp().delete(`users/${userId}/auth-tokens/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  })
}
