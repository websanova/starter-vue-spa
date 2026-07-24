import { useMutation } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'

export function useVerificationResend() {
  return useMutation({
    mutationFn: () =>
      useHttp().post('verify/resend'),
  })
}
