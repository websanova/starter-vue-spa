<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { inject } from "vue"
  import { RouterLink, type RouteLocationRaw } from "vue-router"
  import { navItemVariants, navOrientationKey } from "."
  import { cn } from "@shared/lib/utils"

  const props = defineProps<{
    to?: RouteLocationRaw
    class?: HTMLAttributes["class"]
  }>()

  const orientation = inject(navOrientationKey, undefined)
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    :class="cn(navItemVariants({ orientation }), props.class)"
  >
    <slot />
  </RouterLink>

  <button
    v-else
    type="button"
    :class="cn(navItemVariants({ orientation }), props.class)"
  >
    <slot />
  </button>
</template>
