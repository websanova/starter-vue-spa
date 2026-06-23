import { computed } from 'vue'

import { useHttp } from '../../plugins/http'
import { useQueryClient } from '../../plugins/query'
import { useAppStore } from '../../stores/app'
import { useAuthGet, authQuery } from '../api/auth'
import { deleteToken, getToken } from '../../lib/authToken'

/**
 * Imperative auth orchestration. Safe to call outside component setup (router guards, interceptors) because it never instantiates a query observer.
 */
export const useAuth = function() {
  const app = useAppStore()
  const client = useQueryClient()

  async function refreshToken() {
    return await useHttp().post('refresh')
  }

  async function checkReady() {
    if (app.isAuthReady) {
      return
    }

    if (getToken()) {
      try {
        await refreshToken()
        await fetchUser()
      } catch {
        flush()
      }
    }

    app.activateAuthReady()
  }

  async function fetchUser() {
    return await client.fetchQuery(authQuery())
  }

  function flush() {
    deleteToken()
    client.removeQueries({ queryKey: authQuery().queryKey })
  }

  const isAuthReady = computed(() => app.isAuthReady)

  return {
    checkReady,
    flush,
    isAuthReady,
    refreshToken,
  }
}

/**
 * Reactive authenticated user state. Component only, since it subscribes a query observer that must bind to an active effect scope for cleanup.
 */
export const useAuthUser = function() {
  const { data } = useAuthGet()

  const user = computed(() => data.value ?? null)
  const isLoggedIn = computed(() => !!user.value)

  return {
    isLoggedIn,
    user,
  }
}
