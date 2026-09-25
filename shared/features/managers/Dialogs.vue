<script setup lang="ts">
  import { computed } from 'vue'
  import { dialogs } from '@/config/dialogs'
  import { useDialogService } from '@shared/composables/services/useDialogService'
  import type { Component } from 'vue'

  const { active, isOpen, close } = useDialogService()

  /**
   * Dialogs close themselves through their open model, so the setter
   * hands that to the service rather than unmounting straight away.
   */
  const open = computed({
    get: () => isOpen.value,
    set: (value) => {
      if (!value) {
        close()
      }
    },
  })
</script>

<template>
  <component
    v-if="active"
    v-model:open="open"
    :is="dialogs[active.name] as Component"
    v-bind="active.props"
  />
</template>
