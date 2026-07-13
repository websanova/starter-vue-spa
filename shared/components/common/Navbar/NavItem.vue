<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { inject } from "vue"
  import { RouterLink, type RouteLocationRaw } from "vue-router"
  import { navIconSizeKey, navItemVariants, navOrientationKey } from "."
  import { cn } from "@shared/lib/utils"

  const props = defineProps<{
    to?: RouteLocationRaw
    class?: HTMLAttributes["class"]
  }>()

  const orientation = inject(navOrientationKey, undefined)
  const iconSize = inject(navIconSizeKey, undefined)
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    :class="cn(navItemVariants({ orientation, iconSize }), props.class)"
  >
    <slot />
  </RouterLink>

  <div
    v-else
    :class="cn(navItemVariants({ orientation, iconSize }), props.class)"
  >
    <slot />
  </div>
</template>
