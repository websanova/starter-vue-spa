<script setup lang="ts">
  import { useAuthService } from '@shared/composables/services/useAuthService'
  import { Avatar } from '@shared/components/common/Avatar'

  const { user } = useAuthService()
</script>

<template>
  <Avatar
    :src="user?.avatarUrl"
    :fallback="user?.firstName || user?.email"
  />
</template>
