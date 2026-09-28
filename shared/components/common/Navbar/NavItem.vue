<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { inject } from "vue"
  import { RouterLink, type RouteLocationRaw } from "vue-router"
  import { navItemVariants, navOrientationKey } from "."
  import { cn } from "@shared/utils/cn"

  const props = defineProps<{
    to?: RouteLocationRaw
    href?: string
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

  <a
    v-else-if="href"
    :href="href"
    :class="cn(navItemVariants({ orientation }), props.class)"
    rel="noopener"
    target="_blank"
  >
    <slot />
  </a>

  <div
    v-else
    :class="cn(navItemVariants({ orientation }), props.class)"
  >
    <slot />
  </div>
</template>
