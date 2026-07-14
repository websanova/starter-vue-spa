<script setup lang="ts">
  import { cva, type VariantProps } from 'class-variance-authority'

  const formVariants = cva('flex w-full flex-col gap-4', {
    variants: {
      size: {
        sm: 'max-w-[10rem]',
        md: 'max-w-[20rem]',
        lg: 'max-w-[30rem]',
        full: 'max-w-full',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  })

  type FormVariants = VariantProps<typeof formVariants>

  const props = defineProps<{
    size?: FormVariants['size']
  }>()
</script>

<template>
  <form
    :class="formVariants({ size: props.size })"
    @submit.prevent
  >
    <slot />
  </form>
</template>
