import { computed } from 'vue'

import { useI18nService } from '@shared/composables/services/i18n'
import { useHttp } from '@shared/plugins/http'
import { useAuthStore } from '@shared/stores/auth'
import { toAuth } from '@/models/auth'
import { deleteToken, getToken, setToken } from '@shared/lib/authToken'
import type { AuthDto } from '@/models/auth'
import type { Locale } from '@shared/plugins/i18n'

export const useAuthService = function() {
  const store = useAuthStore()

  /**
   * Bootstraps auth state on first load. If a token exists,
   * refreshes it and fetches the user, flushing on failure.
   * Marks the store ready either way so it runs only once.
   */
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

  /**
   * Fetches the current user profile into the store and
   * switches the active locale to match the user's setting.
   */
  async function fetchUser() {
    const { data } = await useHttp().get<{ data: AuthDto }>('profile')
    store.user = toAuth(data)
    useI18nService().switchLocale(store.user.locale as Locale)
  }

  /**
   * Clears all local auth state: deletes the token, unsets
   * the user, and resets the ready flag.
   */
  function flush() {
    deleteToken()
    store.user = null
    store.isReady = false
  }

  /**
   * Logs out server side and clears local auth state. Does
   * not await the request since local state is dropped either way.
   */
  function logout() {
    useHttp().post('logout')
    flush()
  }

  /**
   * Exchanges the current token for a fresh one and stores it.
   */
  async function refreshToken() {
    const res = await useHttp().post<{ token: string }>('refresh')
    setToken(res.token)
  }

  /**
   * Starts a session from a freshly issued token. Stores the
   * token, loads the user, and marks the store ready.
   */
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
