<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { reactiveOmit } from "@vueuse/core"
  import { ChevronUpIcon } from "@lucide/vue"
  import { SelectScrollUpButton, type SelectScrollUpButtonProps, useForwardProps } from "reka-ui"
  import { cn } from "@shared/lib/utils"

  const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes["class"] }>()

  const delegatedProps = reactiveOmit(props, "class")
  const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectScrollUpButton
    v-bind="forwardedProps"
    :class="cn('flex cursor-default items-center justify-center py-1', props.class)"
  >
    <ChevronUpIcon class="size-4" />
  </SelectScrollUpButton>
</template>
