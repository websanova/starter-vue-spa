import { useMutation } from '@tanstack/vue-query'
import { useAuthService } from '@shared/composables/services/auth'
import { useHttp } from '@shared/plugins/http'

export interface RegisterData {
  name?: string
  email: string
  password: string
  password_confirmation: string
}

export function useRegister() {
  const { startSession } = useAuthService()
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const { token } = await useHttp().post<{ token: string }>('register', data)
      // Auto login after register. To require email verification first,
      // drop startSession here and route to a verify screen instead.
      await startSession(token)
    },
  })
}
