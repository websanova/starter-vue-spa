<script setup lang="ts">
  import { LayoutListIcon, ListIcon, PlusIcon } from '@lucide/vue'
  import { useDialogService } from '@shared/composables/services/dialog'
  import { usePagination } from '@shared/composables/support/usePagination'
  import { Heading } from '@shared/components/common/Heading'
  import { Search } from '@shared/components/common/Search'
  import { Button } from '@shared/components/ui/button'

  const condensed = defineModel<boolean>('condensed')

  const dialog = useDialogService()

  const { search } = usePagination()
</script>

<template>
  <Heading
    class="flex items-center justify-between"
    :margin="false"
  >
    {{ $t('features.lbl.bookmarks') }}

    <div class="flex items-center gap-2">
      <Search
        v-model="search"
        :placeholder="$t('features.ph.search')"
      />

      <Button
        size="icon"
        variant="outline"
        @click="condensed = !condensed"
      >
        <LayoutListIcon v-if="condensed" />
        <ListIcon v-else />
      </Button>

      <Button
        size="icon"
        @click="dialog.open('bookmarkCreate')"
      >
        <PlusIcon />
      </Button>
    </div>
  </Heading>
</template>
