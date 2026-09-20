<script setup lang="ts">
  import { BookmarkIcon } from '@lucide/vue'
  import { Item } from '@shared/components/common/Item'
  import { Badge } from '@shared/components/ui/badge'
  import type { Bookmark } from '@/models/bookmark'

  defineProps<{
    bookmark: Bookmark
  }>()
</script>

<template>
  <Item>
    <template #icon>
      <BookmarkIcon />
    </template>

    <template #title>
      {{ bookmark.title }}
    </template>

    <a
      class="block truncate text-sm text-link"
      :href="bookmark.url"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ bookmark.url }}
    </a>

    <div
      v-if="bookmark.tags.length"
      class="flex flex-wrap gap-1"
    >
      <Badge
        v-for="tag in bookmark.tags"
        variant="secondary"
        :key="tag.id"
      >
        {{ tag.name }}
      </Badge>
    </div>
  </Item>
</template>
