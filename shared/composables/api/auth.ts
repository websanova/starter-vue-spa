import { computed } from 'vue'

import { useHttp } from '@shared/plugins/http'
import { useAuthStore } from '@shared/stores/auth'
import { toAuth } from '@/models/auth'
import { deleteToken, getToken, setToken } from '@shared/lib/authToken'
import type { AuthDto } from '@/models/auth'

export const useAuth = function() {
  const store = useAuthStore()

  async function checkReady() {
    if (store.isReady) {
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

    store.isReady = true
  }

  async function fetchUser() {
    const { data } = await useHttp().get<{ data: AuthDto }>('profile')
    store.user = toAuth(data)
  }

  function flush() {
    deleteToken()
    store.user = null
    store.isReady = false
  }

  function logout() {
    useHttp().post('logout')
    flush()
  }

  async function refreshToken() {
    const res = await useHttp().post<{ token: string }>('refresh')
    setToken(res.token)
  }

  async function startSession(token: string) {
    setToken(token)
    await fetchUser()
    store.isReady = true
  }

  return {
    isLoggedIn: computed(() => !!store.user),
    isReady: computed(() => store.isReady),
    user: computed(() => store.user),
    checkReady,
    flush,
    logout,
    refreshToken,
    startSession,
  }
}
