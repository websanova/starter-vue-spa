<script setup lang="ts">
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Form } from '@shared/components/common/Form'
  import { Button } from '@shared/components/ui/button'
  import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@shared/components/ui/dialog'

  const props = defineProps<{
    title: string
    cancelLabel?: string
    error?: string
    okLabel?: string
    pending?: boolean
  }>()

  defineEmits<{
    submit: []
  }>()

  const open = defineModel<boolean>('open', { default: false })

  /**
   * Dismissal is held off while the submit is in flight, otherwise the
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
  <Dialog v-model:open="open">
    <DialogContent
      :aria-describedby="undefined"
      :show-close-button="false"
      @escape-key-down="onDismiss"
      @interact-outside="onDismiss"
    >
      <DialogHeader>
        <DialogTitle>
          {{ title }}
        </DialogTitle>
      </DialogHeader>

      <Form
        size="full"
        @submit="$emit('submit')"
      >
        <slot />

        <p
          v-if="error"
          class="text-sm text-destructive"
        >
          {{ error }}
        </p>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            :disabled="pending"
            @click="open = false"
          >
            {{ cancelLabel ?? $t('features.lbl.cancel') }}
          </Button>

          <ButtonLoading
            type="submit"
            :pending="pending"
          >
            {{ okLabel ?? $t('features.lbl.submit') }}
          </ButtonLoading>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
</template>
