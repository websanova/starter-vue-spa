import { computed } from 'vue'

import { useHttp } from '@shared/plugins/http'
import { useAuthStore } from '@shared/stores/auth'
import { toAuth } from '@/models/auth'
import { deleteToken, getToken } from '@shared/lib/authToken'
import type { AuthDto } from '@/models/auth'

export interface LoginData {
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
    const dto = await useHttp().get<AuthDto>('profile')
    store.user = toAuth(dto)
  }

  function flush() {
    deleteToken()
    store.user = null
    store.isReady = false
  }

  async function login(data: LoginData) {
    await useHttp().post('login', data)
    await fetchUser()
    store.isReady = true
  }

  async function refreshToken() {
    return await useHttp().post('refresh')
  }

  async function register(data: RegisterData, options: RegisterOptions = {}) {
    await useHttp().post('register', data)

    if (options.autoLogin) {
      await fetchUser()
      store.isReady = true
    }
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
