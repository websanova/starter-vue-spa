<script setup lang="ts">
  import StarterTextLogo from "@shared/components/logos/StarterText.vue"
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center"
  >
    <div
      class="flex flex-col items-center gap-4 p-8"
    >
      <StarterTextLogo
        class="h-10"
      />
      <RouterView />
    </div>
  </div>
</template>
