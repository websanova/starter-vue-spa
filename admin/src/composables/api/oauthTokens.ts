import { useQuery } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toOAuthToken } from '@/models/oauthToken'
import { toListMeta } from '@shared/models/list'
import type { OAuthTokenDto } from '@/models/oauthToken'
import type { ListMetaDto } from '@shared/models/list'

const key = ['oauth-tokens']

export function useUserOAuthTokens(userId: number) {
  return useQuery({
    queryKey: [...key, userId],
    queryFn: async () => {
      const { data, meta } = await useHttp().get<{ data: OAuthTokenDto[], meta: ListMetaDto }>(`users/${userId}/oauth-tokens`)
      return {
        oauthTokens: data.map(toOAuthToken),
        meta: toListMeta(meta),
      }
    },
  })
}
