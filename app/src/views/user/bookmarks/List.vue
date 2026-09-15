<script setup lang="ts">
  import { PlusIcon } from '@lucide/vue'
  import { useDialogService } from '@shared/composables/services/dialog'
  import { Heading } from '@shared/components/common/Heading'
  import { Button } from '@shared/components/ui/button'
  import BookmarksList from '@/features/lists/Bookmarks.vue'

  const dialog = useDialogService()
</script>

<template>
  <section>
    <Heading
      class="flex items-center justify-between"
      :margin="false"
    >
      {{ $t('features.lbl.bookmarks') }}

      <Button @click="dialog.open('bookmarkCreate')">
        <PlusIcon />
        {{ $t('features.lbl.create') }}
      </Button>
    </Heading>

    <BookmarksList />
  </section>
</template>