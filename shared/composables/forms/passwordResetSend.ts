import { usePasswordResetSend } from '@shared/composables/api/passwordResetSend'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { AuthRules } from '@shared/rules/auth'

interface Options {
  onSuccess?: () => void
}

export function usePasswordResetSendForm(options: Options = {}) {
  const passwordResetSend = usePasswordResetSend()

  return useValidatedForm({
    rules: {
      email: AuthRules.email(),
    },
    initial: {
      email: '',
    },
    onSubmit: passwordResetSend.mutateAsync,
    onSuccess: options.onSuccess,
  })
}
