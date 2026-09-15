<script setup lang="ts">
  import { PlusIcon } from '@lucide/vue'
  import { LayoutBody, LayoutBodyAside, LayoutBodyContent } from '@shared/components/common/Layout'
  import BookmarksNav from '@/features/navs/Bookmarks.vue'
  import PageTransition from '@shared/features/transitions/Page.vue'
  import { Button } from '@shared/components/ui/button'
</script>

<template>
  <LayoutBody>
    <LayoutBodyAside
      class="sm:unhidden"
      side="left"
    >
      <div class="my-3">
        <Button class="w-full">
          <PlusIcon />
          {{ $t('features.lbl.create') }}
        </Button>
      </div>

      <BookmarksNav />
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
