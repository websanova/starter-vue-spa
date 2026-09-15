<script setup lang="ts">
  import { ref } from 'vue'
  import { PlusIcon } from '@lucide/vue'
  import { SheetMenu } from '@shared/components/common/SheetMenu'
  import TagCreateDialog from '@/features/dialogs/TagCreate.vue'
  import TagDeleteDialog from '@/features/dialogs/TagDelete.vue'
  import TagUpdateDialog from '@/features/dialogs/TagUpdate.vue'
  import TagsNav from '@/features/navs/Tags.vue'
  import { Button } from '@shared/components/ui/button'
  import type { Tag } from '@/models/tag'

  withDefaults(defineProps<{
    side?: 'left' | 'right'
    width?: string
    headerHeight?: string
  }>(), {
    side: 'left',
  })

  const open = defineModel<boolean>('open', { default: false })

  const isTagCreateOpen = ref<boolean>(false)
  const isTagDeleteOpen = ref<boolean>(false)
  const isTagUpdateOpen = ref<boolean>(false)

  const selectedTag = ref<Tag | null>(null)

  /**
   * The dialog sits outside the sheet, since closing the sheet unmounts
   * its content and would take a dialog mounted inside it along with it.
   */
  function onCreate() {
    open.value = false
    isTagCreateOpen.value = true
  }

  function onTagEdit(tag: Tag) {
    open.value = false
    selectedTag.value = tag
    isTagUpdateOpen.value = true
  }

  function onTagDelete(tag: Tag) {
    open.value = false
    selectedTag.value = tag
    isTagDeleteOpen.value = true
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

    <TagsNav
      @edit="onTagEdit"
      @delete="onTagDelete"
    />
  </SheetMenu>

  <TagCreateDialog v-model:open="isTagCreateOpen" />

  <template v-if="selectedTag">
    <!--
      Keyed on the name as well as the id, so a renamed tag remounts the
      form with its new name rather than the one it was first opened with.
    -->
    <TagUpdateDialog
      v-model:open="isTagUpdateOpen"
      :key="`${selectedTag.id}:${selectedTag.name}`"
      :tag="selectedTag"
    />

    <TagDeleteDialog
      v-model:open="isTagDeleteOpen"
      :tag="selectedTag"
    />
  </template>
</template>
