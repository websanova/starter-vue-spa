<script setup lang="ts">
  import { PlusIcon } from '@lucide/vue'
  import { SheetMenu } from '@shared/components/common/SheetMenu'
  import BookmarksNav from '@/features/navs/Bookmarks.vue'
  import { Button } from '@shared/components/ui/button'

  withDefaults(defineProps<{
    side?: 'left' | 'right'
    width?: string
    headerHeight?: string
  }>(), {
    side: 'left',
  })

  const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <SheetMenu
    v-model:open="open"
    :title="$t('features.sr.menu_bookmarks')"
    :side="side"
    :width="width"
    :header-height="headerHeight"
  >
    <div class="my-3">
      <Button class="w-full">
        <PlusIcon />
        {{ $t('features.lbl.create') }}
      </Button>
    </div>

    <BookmarksNav />
  </SheetMenu>
</template>
