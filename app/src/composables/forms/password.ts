import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { AuthRules } from '@shared/rules/auth'
import { usePasswordResetSend, usePasswordResetUpdate } from '@/composables/api/password'

interface UpdateOptions {
  email: string
  token: string
}

export function usePasswordResetSendForm() {
  const passwordResetSend = usePasswordResetSend()

  return useValidatedForm({
    rules: {
      email: AuthRules.email(),
    },
    initial: {
      email: '',
    },
    onSubmit: passwordResetSend.mutateAsync,
  })
}

export function usePasswordResetUpdateForm(options: UpdateOptions) {
  const passwordResetUpdate = usePasswordResetUpdate()

  return useValidatedForm({
    rules: {
      password: AuthRules.password(),
      password_confirmation: AuthRules.password(),
    },
    initial: {
      password: '',
      password_confirmation: '',
    },
    refine: AuthRules.passwordsMatch,
    onSubmit: (values) => passwordResetUpdate.mutateAsync({
      ...values,
      email: options.email,
      token: options.token,
    }),
  })
}
