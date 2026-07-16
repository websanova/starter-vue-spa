<script setup lang="ts">
  import { useAuth } from '@shared/composables/support/auth'
  import { useActionMutation } from '@shared/composables/support/useActionMutation'
  import { useFileUpload } from '@shared/composables/support/useFileUpload'
  import { Avatar, AvatarFallback, AvatarImage } from '@shared/components/ui/avatar'
  import { Button } from '@shared/components/ui/button'

  const { user, setAvatar, deleteAvatar } = useAuth()

  const { open, isPending, error: uploadError } = useFileUpload<{ data: { avatar_url: string } }>({
    url: 'avatar',
    field: 'avatar',
    accept: 'image/png,image/jpeg,image/webp',
    maxSize: 2 * 1024 * 1024,
    i18nKey: 'features.form.avatar',
    onSuccess: ({ data }) => setAvatar(data.avatar_url),
  })

  const { submit: removeAvatar, isPending: isDeleting, error: deleteError } = useActionMutation({
    onSubmit: deleteAvatar,
  })
</script>

<template>
  <div>
    <Avatar>
      <AvatarImage
        v-if="user?.avatarUrl"
        :src="user.avatarUrl"
      />

      <AvatarFallback>
        {{ user?.firstName?.charAt(0).toUpperCase() }}
      </AvatarFallback>
    </Avatar>

    <Button
      :disabled="isPending"
      @click="open()"
    >
      {{ $t('features.lbl.upload') }}
    </Button>

    <Button
      v-if="user?.avatarUrl"
      variant="outline"
      color="destructive"
      :disabled="isDeleting"
      @click="removeAvatar()"
    >
      {{ $t('features.lbl.remove') }}
    </Button>

    <p v-if="uploadError || deleteError">
      {{ uploadError || deleteError }}
    </p>
  </div>
</template>
