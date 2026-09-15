<script setup lang="ts">
  import { useBookmarks } from '@/composables/api/bookmarks'

  const { data: bookmarks, isPending, error } = useBookmarks()
</script>

<template>
  <div>
    <p v-if="isPending">Loading...</p>
    <p v-else-if="error">{{ error.message }}</p>

    <ul v-else>
      <li
        v-for="bookmark in bookmarks"
        :key="bookmark.id"
      >
        {{ bookmark.title }}
      </li>
    </ul>
  </div>
</template>
