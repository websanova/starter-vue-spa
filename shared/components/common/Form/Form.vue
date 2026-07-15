<script setup lang="ts">
  import { type FormVariants, formVariants } from "."

  defineProps<{
    size?: FormVariants["size"]
  }>()

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT") {
      e.preventDefault()
    }
  }
</script>

<template>
  <form
    :class="formVariants({ size })"
    @submit.prevent
    @keydown="onKeydown"
  >
    <slot />
  </form>
</template>
