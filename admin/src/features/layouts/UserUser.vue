<script setup lang="ts">
  import PageTransition from '@shared/features/transitions/Page.vue'
</script>

<template>

  <div>
    User show

    <hr />

    <RouterView v-slot="{ Component }" >
      <PageTransition>
        <component :is="Component" />
      </PageTransition>
    </RouterView>
  </div>
</template>
