import { useFileUpload } from '@shared/composables/support/useFileUpload'
import { useUploadAvatar } from './api'

export function useAvatarUpload() {
  const upload = useUploadAvatar()

  return useFileUpload({
    accept: 'image/png,image/jpeg,image/webp',
    maxSize: 2 * 1024 * 1024,
    i18nKey: 'features.form.avatar',
    onSubmit: upload.mutateAsync,
  })
}
