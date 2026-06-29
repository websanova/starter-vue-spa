import { computed } from 'vue'

import { useHttp } from '../../plugins/http'
import { useAuthStore } from '../../stores/auth'
import { toAuth } from '../../models/auth'
import { deleteToken, getToken } from '../../lib/authToken'

import type { AuthDto } from '../../models/auth'

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  password_confirmation: string
}

interface RegisterOptions {
  autoLogin?: boolean
}

/**
 * Auth orchestration. Safe to call outside component setup (router guards, interceptors) since it does not instantiate a query observer.
 */
export const useAuth = function() {
  const store = useAuthStore()

  async function fetchUser() {
    const dto = await useHttp().get<AuthDto>('profile')
    store.user = toAuth(dto)
  }

  async function refreshToken() {
    return await useHttp().post('refresh')
  }

  async function login(data: LoginData) {
    await useHttp().post('login', data)
    await fetchUser()
    store.isReady = true
  }

  async function register(data: RegisterData, options: RegisterOptions = {}) {
    await useHttp().post('register', data)

    if (options.autoLogin) {
      await fetchUser()
      store.isReady = true
    }
  }

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

  function flush() {
    deleteToken()
    store.user = null
    store.isReady = false
  }

  return {
    user: computed(() => store.user),
    isLoggedIn: computed(() => !!store.user),
    isReady: computed(() => store.isReady),
    checkReady,
    login,
    register,
    flush,
    refreshToken,
  }
}
