<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@shared/components/ui/dropdown-menu"
  import NavItem from "./NavItem.vue"

  const props = withDefaults(defineProps<{
    align?: "start" | "center" | "end"
    class?: HTMLAttributes["class"]
  }>(), {
    align: "start",
  })
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <NavItem :class="props.class">
        <slot name="trigger" />
      </NavItem>
    </DropdownMenuTrigger>

    <DropdownMenuContent :align="align">
      <slot />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
