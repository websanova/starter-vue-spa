<script setup lang="ts">
  import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@shared/components/ui/dropdown-menu"
  import NavItem from "./NavItem.vue"

  withDefaults(defineProps<{
    align?: "start" | "center" | "end"
  }>(), {
    align: "start",
  })
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <NavItem>
        <slot name="trigger" />
      </NavItem>
    </DropdownMenuTrigger>

    <DropdownMenuContent :align="align">
      <slot />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
