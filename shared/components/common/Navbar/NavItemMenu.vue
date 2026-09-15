<script setup lang="ts">
  import type { RouteLocationRaw } from "vue-router"
  import { DropdownActions } from "@shared/components/common/DropdownActions"
  import NavItem from "./NavItem.vue"

  defineOptions({ inheritAttrs: false })

  defineProps<{
    to: RouteLocationRaw
  }>()
</script>

<template>
  <div class="group relative">
    <!--
      The actions sit beside the link rather than inside it, since a button
      inside an anchor is invalid. Hover is read off the wrapper so the row
      keeps its background while the pointer is over the trigger.
    -->
    <NavItem
      v-bind="$attrs"
      class="pr-8 group-hover:bg-accent"
      :to="to"
    >
      <slot />
    </NavItem>

    <div class="absolute inset-y-0 right-1 flex items-center pointer-fine:opacity-0 group-hover:opacity-100 focus-within:opacity-100 has-data-[state=open]:opacity-100">
      <DropdownActions>
        <slot name="actions" />
      </DropdownActions>
    </div>
  </div>
</template>
