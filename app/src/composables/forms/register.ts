import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { AuthRules } from '@shared/rules/auth'
import { useRegister } from '@/composables/api/register'

interface Options {
  onSuccess?: () => void
}

export function useRegisterForm(options: Options = {}) {
  const register = useRegister()

  return useValidatedForm({
    rules: {
      name: AuthRules.name(),
      email: AuthRules.email(),
      password: AuthRules.password(),
      password_confirmation: AuthRules.password(),
    },
    initial: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    refine: AuthRules.passwordsMatch,
    onSubmit: register.mutateAsync,
    onSuccess: options.onSuccess,
  })
}
