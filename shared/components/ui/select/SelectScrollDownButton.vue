<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { reactiveOmit } from "@vueuse/core"
  import { ChevronDownIcon } from "@lucide/vue"
  import { SelectScrollDownButton, type SelectScrollDownButtonProps, useForwardProps } from "reka-ui"
  import { cn } from "@shared/lib/utils"

  const props = defineProps<SelectScrollDownButtonProps & { class?: HTMLAttributes["class"] }>()

  const delegatedProps = reactiveOmit(props, "class")
  const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectScrollDownButton
    v-bind="forwardedProps"
    :class="cn('flex cursor-default items-center justify-center py-1', props.class)"
  >
    <ChevronDownIcon class="size-4" />
  </SelectScrollDownButton>
</template>
