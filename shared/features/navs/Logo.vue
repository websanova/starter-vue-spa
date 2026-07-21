<script setup lang="ts">
  import { computed, useAttrs } from 'vue'
  import { MenuIcon } from '@lucide/vue'
  import { type RouteLocationRaw } from 'vue-router'
  import { Navbar, NavItem } from '@shared/components/common/Navbar'
  import StarterTextLogo from '@shared/components/logos/StarterText.vue'

  defineProps<{
    to: RouteLocationRaw
  }>()

  defineOptions({ inheritAttrs: false })

  const attrs = useAttrs()
  const isClickable = computed(() => !!attrs.onClick)
</script>

<template>
  <Navbar>
    <NavItem
      :to="isClickable ? undefined : to"
      v-bind="$attrs"
      class="sm:hidden"
    >
      <MenuIcon />
    </NavItem>

    <NavItem
      :to="to"
      class="sm:unhidden [&>svg]:!w-auto"
    >
      <StarterTextLogo />
    </NavItem>
  </Navbar>
</template>
