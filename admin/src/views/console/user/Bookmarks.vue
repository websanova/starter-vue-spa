<script setup lang="ts">
  import BookmarksList from '@/features/lists/Bookmarks.vue'
  import { Heading } from '@shared/components/common/Heading'
  import type { User } from '@/models/user'

  defineProps<{
    user: User
  }>()
</script>

<template>
  <div>
    <BookmarksList :user="user" />
  </div>
</template>
