<script setup lang="ts">
  import { type FormVariants, formVariants } from "."

  defineProps<{
    size?: FormVariants["size"]
  }>()
</script>

<template>
  <form
    :class="formVariants({ size })"
    @submit.prevent
  >
    <slot />
  </form>
</template>
