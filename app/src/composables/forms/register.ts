import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { AuthRules } from '@shared/rules/auth'
import { useSettingsStore } from '@shared/stores/settings'
import { useRegister } from '@/composables/api/register'
import type { RegisterData } from '@/composables/api/register'

interface Options {
  onSuccess?: () => void
}

export function useRegisterForm(options: Options = {}) {
  const settings = useSettingsStore()
  const register = useRegister()

  const hasPhone = settings.data.verificationRequired?.includes('phone') ?? false

  return {
    hasPhone,
    ...useValidatedForm({
      rules: {
        first_name: AuthRules.name(),
        email: AuthRules.email(),
        ...(hasPhone ? { phone: AuthRules.phone() } : {}),
        password: AuthRules.password(),
        password_confirmation: AuthRules.password(),
      },
      initial: {
        first_name: '',
        email: '',
        ...(hasPhone ? { phone: '' } : {}),
        password: '',
        password_confirmation: '',
      },
      refine: AuthRules.passwordsMatch,
      onSubmit: (values) => register.mutateAsync(values as RegisterData),
      onSuccess: options.onSuccess,
    }),
  }
}
