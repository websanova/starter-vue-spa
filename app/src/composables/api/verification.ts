import { useMutation } from '@tanstack/vue-query'
import { useAuthService } from '@shared/composables/services/auth'
import { useHttp } from '@shared/plugins/http'

export interface VerificationConfirmData {
  code: string
}

export function useVerificationConfirm() {
  const { fetchUser } = useAuthService()
  return useMutation({
    mutationFn: async (data: VerificationConfirmData) => {
      await useHttp().post('verify', data)
      // Refetch so isVerificationRequired clears before any redirect,
      // otherwise the verification interceptor bounces back here.
      await fetchUser()
    },
  })
}

export function useVerificationResend() {
  return useMutation({
    mutationFn: () =>
      useHttp().post('verify/resend'),
  })
}
