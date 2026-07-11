<script setup lang="ts">
  import { LayoutBody, LayoutBodyContent } from '@shared/components/common/Layout'
  import PageTransition from '@shared/features/transitions/Page.vue'
</script>

<template>
  <LayoutBody>
    <LayoutBodyContent>
      <RouterView v-slot="{ Component }" >
        <PageTransition>
          <component :is="Component" />
        </PageTransition>
      </RouterView>
    </LayoutBodyContent>
  </LayoutBody>
</template>
