<script setup lang="ts">
  import { PlusIcon } from '@lucide/vue'
  import { useDialogService } from '@shared/composables/services/dialog'
  import { LayoutBody, LayoutBodyAside, LayoutBodyContent } from '@shared/components/common/Layout'
  import TagsNav from '@/features/navs/Tags.vue'
  import PageTransition from '@shared/features/transitions/Page.vue'
  import { Button } from '@shared/components/ui/button'

  const dialog = useDialogService()
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
          @click="dialog.open('tagCreate')"
        >
          <PlusIcon />
          {{ $t('features.lbl.create') }}
        </Button>
      </div>

      <TagsNav />
    </LayoutBodyAside>

    <LayoutBodyContent class="pb-15">
      <RouterView v-slot="{ Component }" >
        <PageTransition>
          <component :is="Component" />
        </PageTransition>
      </RouterView>
    </LayoutBodyContent>
  </LayoutBody>
</template>
