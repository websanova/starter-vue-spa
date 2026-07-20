<script setup lang="ts">
  import { useAuthService } from '@shared/composables/services/auth'
  import { Avatar, AvatarFallback, AvatarImage } from '@shared/components/ui/avatar'

  const { user } = useAuthService()
</script>

<template>
  <Avatar>
    <AvatarImage :src="user?.avatarUrl ?? ''" />

    <AvatarFallback>
      {{ user?.firstName?.charAt(0).toUpperCase() }}
    </AvatarFallback>
  </Avatar>
</template>
