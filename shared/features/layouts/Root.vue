<script setup lang="ts">
  import { onMounted } from 'vue'
  import SiteTransition from '@shared/features/transitions/Site.vue'
  import { removeInitCover } from '@shared/lib/utils'
  import "@shared/assets/main.css"

  onMounted(() => {
    removeInitCover()
  })
</script>

<template>
  <SiteTransition>
      <!-- <cpt-meta /> -->

      <RouterView />
  </SiteTransition>
</template>