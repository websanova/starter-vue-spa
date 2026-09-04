<script setup lang="ts">
  import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '@shared/components/ui/alert-dialog'
  import { Button } from '@shared/components/ui/button'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import type { ButtonVariants } from '@shared/components/ui/button'

  const props = withDefaults(defineProps<{
    title: string
    body?: string
    cancelLabel?: string
    color?: ButtonVariants['color']
    error?: string
    okLabel?: string
    pending?: boolean
    showCancel?: boolean
    showOk?: boolean
  }>(), {
    color: 'primary',
    showCancel: true,
    showOk: true,
  })

  defineEmits<{
    ok: []
  }>()

  const open = defineModel<boolean>('open', { default: false })

  /**
   * Dismissal is held off while the action is in flight, otherwise the
   * dialog goes away with the request still running and the caller is
   * left settling something the user can no longer see.
   */
  function onDismiss(e: Event) {
    if (props.pending) {
      e.preventDefault()
    }
  }
</script>

<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent
      @escape-key-down="onDismiss"
      @interact-outside="onDismiss"
    >
      <AlertDialogHeader>
        <AlertDialogTitle>
          {{ title }}
        </AlertDialogTitle>

        <AlertDialogDescription v-if="body || $slots.default">
          <slot>{{ body }}</slot>
        </AlertDialogDescription>
      </AlertDialogHeader>

      <p
        v-if="error"
        class="text-sm text-destructive"
      >
        {{ error }}
      </p>

      <AlertDialogFooter>
        <Button
          v-if="showCancel"
          variant="outline"
          :disabled="pending"
          @click="open = false"
        >
          {{ cancelLabel ?? $t('features.lbl.cancel') }}
        </Button>

        <ButtonLoading
          v-if="showOk"
          :color="color"
          :pending="pending"
          @click="$emit('ok')"
        >
          {{ okLabel ?? $t('features.lbl.submit') }}
        </ButtonLoading>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
