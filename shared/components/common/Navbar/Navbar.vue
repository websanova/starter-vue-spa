<script setup lang="ts">
  import { provide, toRef } from "vue"
  import { navbarVariants, navOrientationKey, type NavOrientation } from "."

  const props = withDefaults(defineProps<{
    orientation?: NavOrientation
  }>(), {
    orientation: "horizontal",
  })

  provide(navOrientationKey, toRef(props, "orientation"))
</script>

<template>
  <nav :class="navbarVariants({ orientation })">
    <slot />
  </nav>
</template>
