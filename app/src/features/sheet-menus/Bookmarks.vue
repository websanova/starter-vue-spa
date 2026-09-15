<script setup lang="ts">
  import { PlusIcon } from '@lucide/vue'
  import { useDialogService } from '@shared/composables/services/dialog'
  import { SheetMenu } from '@shared/components/common/SheetMenu'
  import TagsNav from '@/features/navs/Tags.vue'
  import { Button } from '@shared/components/ui/button'

  withDefaults(defineProps<{
    side?: 'left' | 'right'
    width?: string
    headerHeight?: string
  }>(), {
    side: 'left',
  })

  const open = defineModel<boolean>('open', { default: false })

  const dialog = useDialogService()
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
      <Button
        class="w-full"
        @click="dialog.open('tagCreate')"
      >
        <PlusIcon />
        {{ $t('features.lbl.create') }}
      </Button>
    </div>

    <TagsNav />
  </SheetMenu>
</template>
