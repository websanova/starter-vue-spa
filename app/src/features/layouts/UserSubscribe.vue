<script setup lang="ts">
  import { LayoutBody, LayoutBodyContent } from '@shared/components/common/Layout'
  import PageTransition from '@shared/features/transitions/Page.vue'
</script>

<template>
  <LayoutBody>
    <LayoutBodyContent centered>
      <div class="mx-auto w-full max-w-xl">
        <RouterView v-slot="{ Component }" >
          <PageTransition>
            <component :is="Component" />
          </PageTransition>
        </RouterView>
      </div>
    </LayoutBodyContent>
  </LayoutBody>
</template>
