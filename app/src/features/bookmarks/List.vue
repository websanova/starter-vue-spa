<script setup lang="ts">
  import { useArchiveBookmark, useBookmarks, useDeleteBookmark } from '@shared/features/bookmarks'
  import { Button } from '@shared/components/ui/button'

  const { data: bookmarks, isPending, error } = useBookmarks()
  const { mutate: deleteBookmark, isPending: deleting } = useDeleteBookmark()
  const { mutate: archiveBookmark, isPending: archiving } = useArchiveBookmark()
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

        <Button
          :disabled="archiving"
          @click="archiveBookmark(bookmark.id)"
        >
          {{ $t('features.lbl.archive') }}
        </Button>

        <Button
          color="destructive"
          :disabled="deleting"
          @click="deleteBookmark(bookmark.id)"
        >
          {{ $t('features.lbl.delete') }}
        </Button>
      </li>
    </ul>
  </div>
</template>
