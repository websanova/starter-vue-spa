import { useQuery } from '@tanstack/vue-query'
import { toSync } from '@/models/sync'
import { useAuthService } from '@shared/composables/services/auth'
import { useHttp } from '@shared/plugins/http'
import type { SyncDto } from '@/models/sync'

export const syncKey = ['sync']

/**
 * Polls the lightweight sync payload that drives cross interface state
 * such as the unread notification count. Gated on an active session so
 * it never runs against the auth screens. The stale time drops the
 * global default to zero so returning to the tab refetches immediately
 * rather than serving a count that may be up to a minute old.
 */
export function useSync() {
  const auth = useAuthService()

  return useQuery({
    queryKey: syncKey,
    queryFn: async () => {
      const { data } = await useHttp().get<{ data: SyncDto }>('sync')
      return toSync(data)
    },
    enabled: auth.isLoggedIn,
    refetchInterval: 60_000,
    staleTime: 0,
  })
}
