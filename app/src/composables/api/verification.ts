import { useMutation } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'

export interface VerificationConfirmData {
  code: string
}

export function useVerificationConfirm() {
  return useMutation({
    mutationFn: (data: VerificationConfirmData) =>
      useHttp().post('verify', data),
  })
}

export function useVerificationResend() {
  return useMutation({
    mutationFn: () =>
      useHttp().post('verify/resend'),
  })
}
