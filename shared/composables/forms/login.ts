import { useLogin } from '@shared/composables/api/login'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { AuthRules } from '@shared/rules/auth'

interface Options {
  onSuccess?: () => void
}

export function useLoginForm(options: Options = {}) {
  const login = useLogin()

  return useValidatedForm({
    rules: {
      email: AuthRules.email(),
      password: AuthRules.password(),
    },
    initial: {
      email: '',
      password: '',
    },
    onSubmit: login.mutateAsync,
    onSuccess: options.onSuccess,
  })
}
