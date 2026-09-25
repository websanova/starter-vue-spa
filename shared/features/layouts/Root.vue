<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useSiteHead } from '@shared/composables/support/useSiteHead'
  import SiteTransition from '@shared/features/transitions/Site.vue'
  import { removeInitCover } from '@shared/lib/initCover'
  import "@shared/assets/main.css"

  useSiteHead()

  onMounted(() => {
    removeInitCover()
  })
</script>

<template>
  <SiteTransition>
      <RouterView />
  </SiteTransition>
</template>