import { useQuery } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toOAuthConsent } from '@shared/models/oauth'
import type { OAuthConsentDto } from '@shared/models/oauth'
import type { LocationQuery } from 'vue-router'

const key = ['oauth-consent']

export function useOAuthConsent(query: LocationQuery) {
  return useQuery({
    queryKey: [...key, query],
    queryFn: async () => {
      const { data } = await useHttp().get<{ data: OAuthConsentDto }>('oauth/consent', {
        params: {
          response_type: query.response_type as string,
          client_id: query.client_id as string,
          redirect_uri: query.redirect_uri as string,
          scope: query.scope as string,
          state: query.state as string,
          code_challenge: query.code_challenge as string,
          code_challenge_method: query.code_challenge_method as string,
        },
      })
      return toOAuthConsent(data)
    },
  })
}
