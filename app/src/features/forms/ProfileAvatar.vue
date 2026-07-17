<script setup lang="ts">
  import { useAuth } from '@shared/composables/api/auth'
  import { useActionMutation } from '@shared/composables/support/useActionMutation'
  import { useFileUpload } from '@shared/composables/support/useFileUpload'
  import { useI18n } from '@shared/plugins/i18n'
  import { Avatar, AvatarFallback, AvatarImage } from '@shared/components/ui/avatar'
  import { Button } from '@shared/components/ui/button'
  import { toast } from '@shared/components/ui/sonner'

  const i18n = useI18n()
  const { user, uploadAvatar, deleteAvatar } = useAuth()

  const { open, isPending, error: uploadError } = useFileUpload({
    accept: 'image/png,image/jpeg,image/webp',
    maxSize: 2 * 1024 * 1024,
    i18nKey: 'features.form.avatar',
    onSubmit: uploadAvatar,
    onSuccess: () => toast.success(i18n.t('features.form.avatar.toast')),
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
