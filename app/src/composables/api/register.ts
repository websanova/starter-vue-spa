import { useMutation } from '@tanstack/vue-query'
import { useAuthService } from '@shared/composables/services/auth'
import { useI18n } from '@shared/plugins/i18n'
import { useHttp } from '@shared/plugins/http'

export interface RegisterData {
  name?: string
  email: string
  phone?: string
  password: string
  password_confirmation: string
}

export function useRegister() {
  const { startSession } = useAuthService()
  const i18n = useI18n()
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const { token } = await useHttp().post<{ token: string }>('register', {
        ...data,
        locale: i18n.locale.value,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
      // Auto login after register. To require email verification first,
      // drop startSession here and route to a verify screen instead.
      await startSession(token)
    },
  })
}
