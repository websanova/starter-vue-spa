import { useFileUpload } from '@shared/composables/support/useFileUpload'
import { useValidatedForm } from '@shared/composables/support/useValidatedForm'
import { UserRules } from '@shared/rules/user'
import { useAuthStore } from '@shared/stores/auth'
import { useUpdateProfile, useUploadAvatar } from '@/composables/api/profile'

export function useProfileForm() {
  const store = useAuthStore()
  const update = useUpdateProfile()

  return useValidatedForm({
    rules: {
      first_name: UserRules.firstName(),
      last_name: UserRules.lastName(),
    },
    initial: {
      first_name: store.user?.firstName ?? '',
      last_name: store.user?.lastName ?? '',
    },
    onSubmit: update.mutateAsync,
  })
}

export function useProfileAvatar() {
  const upload = useUploadAvatar()

  return useFileUpload({
    accept: 'image/png,image/jpeg,image/webp',
    maxSize: 2 * 1024 * 1024,
    i18nKey: 'features.form.avatar',
    onSubmit: upload.mutateAsync,
  })
}
