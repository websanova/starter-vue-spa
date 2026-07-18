<script setup lang="ts">
  import { useAuth } from '@shared/composables/services/auth'
  import { useDeleteAvatar } from '@/composables/api/profile'
  import { useProfileAvatar } from '@/composables/forms/profile'
  // import { Avatar, AvatarFallback, AvatarImage } from '@shared/components/ui/avatar'
  import AccountAvatar from '@shared/features/avatars/Account.vue'
  import { Button } from '@shared/components/ui/button'

  const { user } = useAuth()
  const { open, isPending, error } = useProfileAvatar()
  const { mutate: remove, isPending: isRemoving } = useDeleteAvatar()
</script>

<template>
  <div

  >
    <div
      class="mb-3"
    >
      <AccountAvatar class="size-16" />
    </div>

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
      :disabled="isRemoving"
      @click="remove()"
    >
      {{ $t('features.lbl.remove') }}
    </Button>

    <p v-if="error">
      {{ error }}
    </p>
  </div>
</template>
