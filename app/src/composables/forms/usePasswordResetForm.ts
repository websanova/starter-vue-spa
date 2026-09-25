import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { AuthRules } from '@shared/rules/auth'
import { usePasswordReset } from '@/composables/api/password'

interface UpdateOptions {
  email: string
  token: string
}

export function usePasswordResetForm(options: UpdateOptions) {
  const passwordReset = usePasswordReset()

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
    onSubmit: (values) => passwordReset.mutateAsync({
      ...values,
      email: options.email,
      token: options.token,
    }),
  })
}
