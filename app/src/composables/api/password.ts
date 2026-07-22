import { useMutation } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'

export interface PasswordResetSendData {
  email: string
}

export interface PasswordResetUpdateData {
  email: string
  token: string
  password: string
  password_confirmation: string
}

export function usePasswordResetSend() {
  return useMutation({
    mutationFn: (data: PasswordResetSendData) =>
      useHttp().post('forgot-password', data),
  })
}

export function usePasswordResetUpdate() {
  return useMutation({
    mutationFn: (data: PasswordResetUpdateData) =>
      useHttp().post('reset-password', data),
  })
}
