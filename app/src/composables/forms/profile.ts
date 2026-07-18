import { useI18n } from '@shared/plugins/i18n'
import { useFileUpload } from '@shared/composables/primitives/useFileUpload'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { UserRules } from '@shared/rules/user'
import { useAuthStore } from '@shared/stores/auth'
import { useUpdateProfile, useUploadAvatar } from '@/composables/api/profile'
import { byteToMb } from '@shared/lib/bytes'

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
  const i18n = useI18n()
  const upload = useUploadAvatar()
  const maxSize = 2 * 1024 * 1024

  return useFileUpload({
    accept: 'image/png,image/jpeg,image/webp',
    maxSize,
    field: 'avatar',
    messages: {
      invalidType: () => i18n.t('features.form.avatar.invalid_type', { types: 'png, jpg, webp' }),
      tooLarge: () => i18n.t('features.form.avatar.too_large', { size: i18n.t('site.units.mb', [byteToMb(maxSize)]) }),
      failed: () => i18n.t('features.form.avatar.failed'),
    },
    onSubmit: upload.mutateAsync,
  })
}
