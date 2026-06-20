<!-- <script setup lang="ts">
  import { useBookmarks } from "../model/useBookmarks"
  import BookmarkRow from "./BookmarkRow.vue"

  const { bookmarks, favorite, remove } = useBookmarks()
</script>

<template>
  <div class="flex flex-col">
    <BookmarkRow
      v-for="bookmark in bookmarks"
      :key="bookmark.id"
      :bookmark="bookmark"
      @favorite="favorite.run"
      @remove="remove.run"
    />
  </div>
</template>
 -->