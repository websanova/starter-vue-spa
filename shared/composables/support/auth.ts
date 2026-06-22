import { computed } from 'vue'

import { useHttp } from '../../plugins/http'
import { useQueryClient } from '../../plugins/query'
import { useAppStore } from '../../stores'
import { profileQuery } from '../api/profile'
import { deleteToken, getToken } from '../../lib/authToken'

import type { Auth } from '../../models/auth'

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
        await client.ensureQueryData(profileQuery())
      } catch {
        flush()
      }
    }

    app.activateAuthReady()
  }

  function flush() {
    deleteToken()
    client.removeQueries({ queryKey: profileQuery().queryKey })
  }

  const isAuthReady = computed(() => app.isAuthReady)
  const isLoggedIn = computed(() => !!user.value)
  const user = computed(() => client.getQueryData<Auth>(profileQuery().queryKey) ?? null)

  return {
    checkReady,
    flush,
    isAuthReady,
    isLoggedIn,
    refreshToken,
    user,
  }
}
