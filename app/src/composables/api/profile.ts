import { useMutation } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { useAuthStore } from '@shared/stores/auth'
import { toAuth } from '@/models/auth'
import type { AuthDto } from '@/models/auth'

interface UpdateProfileData {
  first_name?: string
  last_name?: string
  locale?: string
  timezone?: string
}

export function useUpdateProfile() {
  const store = useAuthStore()
  return useMutation({
    mutationFn: (data: UpdateProfileData) => useHttp().patch<{ data: AuthDto }>('profile', data),
    onSuccess: ({ data }) => {
      store.user = toAuth(data)
    },
  })
}

export function useUploadAvatar() {
  const store = useAuthStore()
  return useMutation({
    mutationFn: (file: File) => {
      const form = new FormData()
      form.append('avatar', file)
      return useHttp().post<{ data: { avatar_url: string } }>('avatar', form)
    },
    onSuccess: ({ data }) => {
      if (store.user) store.user.avatarUrl = data.avatar_url
    },
  })
}

export function useDeleteAvatar() {
  const store = useAuthStore()
  return useMutation({
    mutationFn: () => useHttp().delete('avatar'),
    onSuccess: () => {
      if (store.user) store.user.avatarUrl = null
    },
  })
}
