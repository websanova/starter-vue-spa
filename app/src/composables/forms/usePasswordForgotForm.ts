import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { AuthRules } from '@shared/rules/auth'
import { usePasswordForgot } from '@/composables/api/password'

export function usePasswordForgotForm() {
  const passwordForgot = usePasswordForgot()

  return useValidatedForm({
    rules: {
      email: AuthRules.email(),
    },
    initial: {
      email: '',
    },
    onSubmit: passwordForgot.mutateAsync,
  })
}
