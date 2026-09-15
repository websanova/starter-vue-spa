<script setup lang="ts">
  import { ref } from 'vue'
  import { PlusIcon } from '@lucide/vue'
  import { SheetMenu } from '@shared/components/common/SheetMenu'
  import TagCreateDialog from '@/features/dialogs/TagCreate.vue'
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

  const isTagCreateOpen = ref<boolean>(false)

  /**
   * The dialog sits outside the sheet, since closing the sheet unmounts
   * its content and would take a dialog mounted inside it along with it.
   */
  function onCreate() {
    open.value = false
    isTagCreateOpen.value = true
  }
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
        @click="onCreate"
      >
        <PlusIcon />
        {{ $t('features.lbl.create') }}
      </Button>
    </div>

    <TagsNav />
  </SheetMenu>

  <TagCreateDialog v-model:open="isTagCreateOpen" />
</template>
