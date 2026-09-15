<script setup lang="ts">
  import { ref } from 'vue'
  import { PlusIcon } from '@lucide/vue'
  import { Heading } from '@shared/components/common/Heading'
  import { Button } from '@shared/components/ui/button'
  import BookmarkCreateDialog from '@/features/dialogs/BookmarkCreate.vue'
  import BookmarksList from '@/features/lists/Bookmarks.vue'

  const isBookmarkCreateOpen = ref<boolean>(false)
</script>

<template>
  <section>
    <Heading class="flex items-center justify-between">
      {{ $t('features.lbl.bookmarks') }}

      <Button @click="isBookmarkCreateOpen = true">
        <PlusIcon />
        {{ $t('features.lbl.create') }}
      </Button>
    </Heading>

    <BookmarksList />

    <BookmarkCreateDialog v-model:open="isBookmarkCreateOpen" />
  </section>
</template>