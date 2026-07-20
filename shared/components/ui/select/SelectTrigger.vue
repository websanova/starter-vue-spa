<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { reactiveOmit } from "@vueuse/core"
  import { ChevronDownIcon } from "@lucide/vue"
  import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from "reka-ui"
  import { cn } from "@shared/lib/utils"

  const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes["class"] }>()

  const delegatedProps = reactiveOmit(props, "class")
  const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="cn('border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1', props.class)"
  >
    <slot />

    <SelectIcon as-child>
      <ChevronDownIcon class="size-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
