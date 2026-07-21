<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { reactiveOmit } from "@vueuse/core"
  import { DropdownMenuRadioItem, type DropdownMenuRadioItemProps, useForwardProps } from "reka-ui"
  import { cn } from "@shared/lib/utils"

  const props = defineProps<DropdownMenuRadioItemProps & { class?: HTMLAttributes["class"] }>()

  const delegatedProps = reactiveOmit(props, "class")
  const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="forwardedProps"
    :class="cn('relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[state=checked]:text-active data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0', props.class)"
  >
    <slot />
  </DropdownMenuRadioItem>
</template>
