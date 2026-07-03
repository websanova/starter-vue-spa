<script setup lang="ts">
  import LogoStarterText from "@shared/components/logos/LogoStarterText.vue"
  import TransitionPage from '@shared/features/transitions/TransitionPage.vue'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="flex w-full max-w-sm flex-col items-center gap-4 p-8">
      <LogoStarterText class="h-10" />

      <TransitionPage>
        <RouterView />
      </TransitionPage>
    </div>
  </div>
</template>
