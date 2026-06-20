<script setup lang="ts">
  import type { Bookmark } from "../types"

  defineProps<{
    bookmark: Bookmark
  }>()

  defineEmits<{
    remove: [id: number]
  }>()
</script>

<template>
  <div class="flex items-center justify-between border-b py-2">
    <div class="font-medium">{{ bookmark.title }}</div>
    <div class="text-sm text-muted-foreground">owner #{{ bookmark.ownerId }}</div>
  </div>
</template>
