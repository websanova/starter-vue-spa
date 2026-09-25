<script setup lang="ts">
  import { BookmarkIcon } from '@lucide/vue'
  import { useDialogService } from '@shared/composables/services/useDialogService'
  import { Button } from '@shared/components/ui/button'
  import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@shared/components/ui/empty'

  const dialog = useDialogService()
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <BookmarkIcon />
      </EmptyMedia>

      <EmptyTitle class="capitalize">
        {{ $t('features.empty.bookmarks.title') }}
      </EmptyTitle>

      <EmptyDescription>
        {{ $t('features.empty.bookmarks.note') }}
      </EmptyDescription>
    </EmptyHeader>

    <EmptyContent>
      <Button
        class="capitalize"
        @click="dialog.open('bookmarkCreate')"
      >
        {{ $t('features.empty.bookmarks.action') }}
      </Button>
    </EmptyContent>
  </Empty>
</template>
