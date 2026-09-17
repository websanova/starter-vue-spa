<script setup lang="ts">
  import UserUpdateForm from '@/features/forms/UserUpdate.vue'
  import { Heading } from '@shared/components/common/Heading'
  import type { User } from '@/models/user'

  defineProps<{
    user: User
  }>()
</script>

<template>
  <div>
    <UserUpdateForm :user="user" />
  </div>
</template>
