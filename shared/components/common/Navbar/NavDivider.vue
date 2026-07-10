<script setup lang="ts">
  import { inject } from "vue"
  import { navDividerVariants, navOrientationKey } from "."

  const orientation = inject(navOrientationKey, undefined)
</script>

<template>
  <div :class="navDividerVariants({ orientation })" />
</template>
