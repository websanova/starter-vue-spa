<script setup lang="ts">
  import { onMounted } from 'vue'
  import TransitionSite from '@shared/features/transitions/TransitionSite.vue'
  import { removeInitCover } from '@shared/lib/utils'
  import "@shared/assets/main.css"

  onMounted(() => {
    removeInitCover()
  })
</script>

<template>
  <TransitionSite>
      <!-- <cpt-meta /> -->

      <RouterView />
  </TransitionSite>
</template>