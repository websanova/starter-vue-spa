import { useMutation } from '@tanstack/vue-query'
import { useAuthService } from '@shared/composables/services/auth'
import { useHttp } from '@shared/plugins/http'

export interface VerificationConfirmData {
  code: string
  channel: string
}

export function useVerificationConfirm() {
  const { fetchUser } = useAuthService()
  return useMutation({
    mutationFn: async (data: VerificationConfirmData) => {
      await useHttp().post('verify', data)
      // Refetch so the verification flags clear before any redirect,
      // otherwise the verification interceptor bounces back here.
      await fetchUser()
    },
  })
}

export interface VerificationResendData {
  channel: string
}

export function useVerificationResend() {
  return useMutation({
    mutationFn: (data: VerificationResendData) =>
      useHttp().post('verify/resend', data),
  })
}
