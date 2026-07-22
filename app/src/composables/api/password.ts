import { useMutation } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'

export interface PasswordForgotData {
  email: string
}

export interface PasswordResetData {
  email: string
  token: string
  password: string
  password_confirmation: string
}

export function usePasswordForgot() {
  return useMutation({
    mutationFn: (data: PasswordForgotData) =>
      useHttp().post('forgot-password', data),
  })
}

export function usePasswordReset() {
  return useMutation({
    mutationFn: (data: PasswordResetData) =>
      useHttp().post('reset-password', data),
  })
}
