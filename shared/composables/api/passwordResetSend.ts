import { useMutation } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'

export interface PasswordResetSendData {
  email: string
}

export function usePasswordResetSend() {
  return useMutation({
    mutationFn: (data: PasswordResetSendData) =>
      useHttp().post('forgot-password', data),
  })
}
