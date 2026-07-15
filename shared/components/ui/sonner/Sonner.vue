<script lang="ts" setup>
  import type { ToasterProps } from "vue-sonner"
  import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon, XIcon } from "@lucide/vue"
  import { Toaster as Sonner } from "vue-sonner"
  import { cn } from '@shared/lib/utils'
  import "vue-sonner/style.css"

  const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    v-bind="props"
    :duration="2000"
    rich-colors
    :class="cn('toaster group', props.class)"
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
      '--normal-bg': 'var(--primary)',
      '--normal-text': 'var(--primary-foreground)',
      '--normal-border': 'var(--primary)',
    }"
  >
    <template #success-icon>
      <CircleCheckIcon />
    </template>
    <template #info-icon>
      <InfoIcon />
    </template>
    <template #warning-icon>
      <TriangleAlertIcon />
    </template>
    <template #error-icon>
      <OctagonXIcon />
    </template>
    <template #loading-icon>
      <div>
        <Loader2Icon class="animate-spin" />
      </div>
    </template>
    <template #close-icon>
      <XIcon />
    </template>
  </Sonner>
</template>
