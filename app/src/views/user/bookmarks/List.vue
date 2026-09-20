<script setup lang="ts">
  import { ref } from 'vue'
  import BookmarksHeading from '@/features/headings/Bookmarks.vue'
  import BookmarksList from '@/features/lists/Bookmarks.vue'

  const condensed = ref(false)
</script>

<template>
  <section>
    <BookmarksHeading v-model:condensed="condensed" />

    <BookmarksList :condensed="condensed" />
  </section>
</template>
