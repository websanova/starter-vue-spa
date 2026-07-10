<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { AvatarRoot } from "reka-ui"
  import { type AvatarVariants, avatarVariants } from "."
  import { cn } from "@shared/lib/utils"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
    size?: AvatarVariants["size"]
    shape?: AvatarVariants["shape"]
  }>()
</script>

<template>
  <AvatarRoot :class="cn(avatarVariants({ size, shape }), props.class)">
    <slot />
  </AvatarRoot>
</template>
