<script setup lang="ts">
  import { useBookmarks } from "../model/useBookmarks"
  import BookmarkRow from "./BookmarkRow.vue"

  const { items, load, toggleFavorite, remove } = useBookmarks()

  load()
</script>

<template>
  <div class="flex flex-col">
    <BookmarkRow
      v-for="bookmark in items"
      :key="bookmark.id"
      :bookmark="bookmark"
      @favorite="toggleFavorite"
      @remove="remove"
    />
  </div>
</template>
