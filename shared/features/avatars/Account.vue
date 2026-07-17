<script setup lang="ts">
  import { useAuth } from '@shared/composables/api/auth'
  import { Avatar, AvatarFallback, AvatarImage } from '@shared/components/ui/avatar'

  const { user } = useAuth()
</script>

<template>
  <Avatar>
    <AvatarImage
      v-if="user?.avatarUrl"
      :src="user.avatarUrl"
    />

    <AvatarFallback>
      {{ user?.firstName?.charAt(0).toUpperCase() }}
    </AvatarFallback>
  </Avatar>
</template>
