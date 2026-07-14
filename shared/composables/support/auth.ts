import { computed } from 'vue'

import { useHttp } from '@shared/plugins/http'
import { useAuthStore } from '@shared/stores/auth'
import { toAuth } from '@/models/auth'
import { deleteToken, getToken, setToken } from '@shared/lib/authToken'
import type { AuthDto } from '@/models/auth'

export interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  name?: string
  email: string
  password: string
  password_confirmation: string
}

interface RegisterOptions {
  autoLogin?: boolean
}

interface UpdateProfileData {
  first_name: string
  last_name: string
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
    const { data } = await useHttp().get<{ data: AuthDto }>('profile')
    store.user = toAuth(data)
  }

  function flush() {
    deleteToken()
    store.user = null
    store.isReady = false
  }

  async function login(data: LoginData) {
    const res = await useHttp().post<{ token: string }>('login', data)
    setToken(res.token)
    await fetchUser()
    store.isReady = true
  }

  function logout() {
    useHttp().post('logout')
    flush()
  }

  async function refreshToken() {
    const res = await useHttp().post<{ token: string }>('refresh')
    setToken(res.token)
  }

  async function register(data: RegisterData, options: RegisterOptions = {}) {
    const res = await useHttp().post<{ token: string }>('register', data)
    setToken(res.token)

    if (options.autoLogin) {
      await fetchUser()
      store.isReady = true
    }
  }

  async function updateProfile(data: UpdateProfileData) {
    const { data: dto } = await useHttp().patch<{ data: AuthDto }>('profile', data)
    store.user = toAuth(dto)
  }

  return {
    user: computed(() => store.user),
    isLoggedIn: computed(() => !!store.user),
    isReady: computed(() => store.isReady),
    checkReady,
    login,
    logout,
    register,
    flush,
    refreshToken,
    updateProfile,
  }
}
