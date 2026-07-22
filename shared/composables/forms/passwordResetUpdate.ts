import { usePasswordResetUpdate } from '@shared/composables/api/passwordResetUpdate'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { AuthRules } from '@shared/rules/auth'

interface Options {
  email: string
  token: string
  onSuccess?: () => void
}

export function usePasswordResetUpdateForm(options: Options) {
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
    onSuccess: options.onSuccess,
  })
}
