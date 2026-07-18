<script setup lang="ts">
  import { provide, toRef } from "vue"
  import { navbarVariants, navIconSizeKey, navOrientationKey, type NavIconSize, type NavOrientation } from "."

  const props = withDefaults(defineProps<{
    orientation?: NavOrientation
    iconSize?: NavIconSize
  }>(), {
    orientation: "horizontal",
    iconSize: "md",
  })

  provide(navOrientationKey, toRef(props, "orientation"))
  provide(navIconSizeKey, toRef(props, "iconSize"))
</script>

<template>
  <nav :class="navbarVariants({ orientation })">
    <slot />
  </nav>
</template>
