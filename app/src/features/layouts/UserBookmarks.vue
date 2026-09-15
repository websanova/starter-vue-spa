<script setup lang="ts">
  import { ref } from 'vue'
  import { PlusIcon } from '@lucide/vue'
  import { LayoutBody, LayoutBodyAside, LayoutBodyContent } from '@shared/components/common/Layout'
  import TagCreateDialog from '@/features/dialogs/TagCreate.vue'
  import TagDeleteDialog from '@/features/dialogs/TagDelete.vue'
  import TagUpdateDialog from '@/features/dialogs/TagUpdate.vue'
  import TagsNav from '@/features/navs/Tags.vue'
  import PageTransition from '@shared/features/transitions/Page.vue'
  import { Button } from '@shared/components/ui/button'
  import type { Tag } from '@/models/tag'

  const isTagCreateOpen = ref<boolean>(false)
  const isTagDeleteOpen = ref<boolean>(false)
  const isTagUpdateOpen = ref<boolean>(false)

  const selectedTag = ref<Tag | null>(null)

  function onTagEdit(tag: Tag) {
    selectedTag.value = tag
    isTagUpdateOpen.value = true
  }

  function onTagDelete(tag: Tag) {
    selectedTag.value = tag
    isTagDeleteOpen.value = true
  }
</script>

<template>
  <LayoutBody>
    <LayoutBodyAside
      class="sm:unhidden"
      side="left"
    >
      <div class="my-3">
        <Button
          class="w-full"
          @click="isTagCreateOpen = true"
        >
          <PlusIcon />
          {{ $t('features.lbl.create') }}
        </Button>
      </div>

      <TagsNav
        @edit="onTagEdit"
        @delete="onTagDelete"
      />
    </LayoutBodyAside>

    <LayoutBodyContent class="pb-15">
      <RouterView v-slot="{ Component }" >
        <PageTransition>
          <component :is="Component" />
        </PageTransition>
      </RouterView>
    </LayoutBodyContent>

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
  </LayoutBody>
</template>
