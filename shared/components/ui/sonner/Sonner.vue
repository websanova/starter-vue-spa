<script setup lang="ts">
  import { Toaster as Sonner, type ToasterProps } from "vue-sonner"
  import "vue-sonner/style.css"

  defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    rich-colors
    :style="{
      '--success-bg': 'var(--success)',
      '--success-text': 'var(--success-foreground)',
      '--success-border': 'var(--success)',
      '--error-bg': 'var(--destructive)',
      '--error-text': 'var(--destructive-foreground)',
      '--error-border': 'var(--destructive)',
      '--warning-bg': 'var(--warning)',
      '--warning-text': 'var(--warning-foreground)',
      '--warning-border': 'var(--warning)',
    }"
  />
</template>
