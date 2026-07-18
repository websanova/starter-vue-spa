<script setup lang="ts">
  import { type StackVariants, stackVariants } from "."

  defineProps<{
    gap?: StackVariants["gap"]
  }>()
</script>

<template>
  <div :class="stackVariants({ gap })">
    <slot />
  </div>
</template>
