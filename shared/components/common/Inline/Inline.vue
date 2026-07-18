<script setup lang="ts">
  import { type InlineVariants, inlineVariants } from "."

  defineProps<{
    gap?: InlineVariants["gap"]
  }>()
</script>

<template>
  <div :class="inlineVariants({ gap })">
    <slot />
  </div>
</template>
