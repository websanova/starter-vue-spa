<script setup lang="ts">
  import { computed, useAttrs } from 'vue'
  import { RouterLink, type RouteLocationRaw } from 'vue-router'
  import StarterLogo from '@shared/components/logos/Starter.vue'
  import StarterTextLogo from '@shared/components/logos/StarterText.vue'

  defineProps<{
    to: RouteLocationRaw
  }>()

  defineOptions({ inheritAttrs: false })

  const attrs = useAttrs()
  const isClickable = computed(() => !!attrs.onClick)
</script>

<template>
  <RouterLink :to="to" class="flex h-full items-center sm:unhidden">
    <StarterTextLogo class="h-6" />
  </RouterLink>

  <component
    :is="isClickable ? 'div' : RouterLink"
    :to="isClickable ? undefined : to"
    v-bind="$attrs"
    :class="['flex h-full items-center sm:hidden', isClickable ? 'cursor-pointer' : '']"
  >
    <StarterLogo class="h-6" />
  </component>
</template>
