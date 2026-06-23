import { useQuery } from '@tanstack/vue-query'

import { useHttp } from '../../plugins/http'
import { toAuth } from '../../models/auth'

import type { Auth, AuthDto } from '../../models/auth'

/**
 * Query definition for the authenticated profile. Shared by the component hook and imperative fetches so both resolve against the same cache entry.
 */
export function authQuery() {
  return {
    enabled: false,
    queryKey: ['auth'] as const,
    queryFn: async (): Promise<Auth> => toAuth(await useHttp().get<AuthDto>('profile')),
  }
}

/**
 * Fetches the authenticated profile as reactive query state for components.
 */
export function useAuthGet() {
  return useQuery(authQuery())
}
