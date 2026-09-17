<script setup lang="ts">
  import { RouterLink, type RouteLocationRaw } from "vue-router"

  defineProps<{
    to: RouteLocationRaw
  }>()
</script>

<template>
  <!-- -mb-px pulls the tab border over the NavTabs border -->
  <RouterLink
    :to="to"
    class="-mb-px border-b-2 border-transparent pb-2 text-muted-foreground transition-colors hover:text-foreground [&.router-link-active]:border-active [&.router-link-active]:text-active"
  >
    <slot />
  </RouterLink>
</template>
