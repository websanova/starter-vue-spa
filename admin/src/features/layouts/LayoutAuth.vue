<script setup lang="ts">
  import LogoStarterText from "@shared/components/logos/LogoStarterText.vue"
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="flex flex-col items-center gap-4 p-8">
      <LogoStarterText class="h-10" />
      <RouterView />
    </div>
  </div>
</template>