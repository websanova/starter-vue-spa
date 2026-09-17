<script setup lang="ts">
  import UserTable from '@/features/tables/User.vue'
  import { Heading } from '@shared/components/common/Heading'
  import type { User } from '@/models/user'

  defineProps<{
    user: User
  }>()
</script>

<template>
  <div>
    <UserTable :user="user" />
  </div>
</template>
