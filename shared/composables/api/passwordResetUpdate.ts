import { useMutation } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'

export interface PasswordResetUpdateData {
  email: string
  token: string
  password: string
  password_confirmation: string
}

export function usePasswordResetUpdate() {
  return useMutation({
    mutationFn: (data: PasswordResetUpdateData) =>
      useHttp().post('reset-password', data),
  })
}
