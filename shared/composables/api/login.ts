import { useMutation } from '@tanstack/vue-query'
import { useAuthService } from '@shared/composables/services/auth'
import { useHttp } from '@shared/plugins/http'

export interface LoginData {
  email: string
  password: string
}

export function useLogin() {
  const { startSession } = useAuthService()
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const { token } = await useHttp().post<{ token: string }>('login', data)
      await startSession(token)
    },
  })
}
