<script setup lang="ts">
  import StarterTextLogo from "@shared/components/logos/StarterText.vue"
  import PageTransition from '@shared/features/transitions/Page.vue'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="flex w-full max-w-sm flex-col items-center gap-4 p-8">
      <StarterTextLogo class="h-10" />

      <PageTransition>
        <RouterView />
      </PageTransition>
    </div>
  </div>
</template>
