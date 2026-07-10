<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { reactiveOmit } from "@vueuse/core"
  import { AvatarFallback, type AvatarFallbackProps, useForwardProps } from "reka-ui"
  import { cn } from "@shared/lib/utils"

  const props = defineProps<AvatarFallbackProps & { class?: HTMLAttributes["class"] }>()

  const delegatedProps = reactiveOmit(props, "class")
  const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <AvatarFallback
    v-bind="forwardedProps"
    :class="cn('flex h-full w-full items-center justify-center', props.class)"
  >
    <slot />
  </AvatarFallback>
</template>
