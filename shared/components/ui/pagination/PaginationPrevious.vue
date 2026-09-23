<script setup lang="ts">
import type { PaginationPrevProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from '@shared/components/ui/button'
import { ChevronLeftIcon } from "@lucide/vue"
import { reactiveOmit } from "@vueuse/core"
import { PaginationPrev, useForwardProps } from "reka-ui"
import { cn } from '@shared/utils/utils'
import { buttonVariants } from '@shared/components/ui/button'

const props = withDefaults(defineProps<PaginationPrevProps & {
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}>(), {
  size: "md",
})

const delegatedProps = reactiveOmit(props, "class", "size")
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <PaginationPrev
    data-slot="pagination-previous"
    :class="cn(buttonVariants({ variant: 'ghost', size }), 'gap-1 px-2.5 sm:pr-2.5', props.class)"
    v-bind="forwarded"
  >
    <slot>
      <ChevronLeftIcon />
    </slot>
  </PaginationPrev>
</template>
