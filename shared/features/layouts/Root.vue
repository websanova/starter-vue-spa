<script setup lang="ts">
  import { onMounted } from 'vue'
  import Head from '@shared/features/meta/Head.vue'
  import SiteTransition from '@shared/features/transitions/Site.vue'
  import { removeInitCover } from '@shared/lib/utils'
  import "@shared/assets/main.css"

  onMounted(() => {
    removeInitCover()
  })
</script>

<template>
  <SiteTransition>
      <Head />

      <RouterView />
  </SiteTransition>
</template>