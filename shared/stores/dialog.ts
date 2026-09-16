import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DialogName } from '@shared/models/dialog'

interface ActiveDialog {
  name: DialogName
  props: Record<string, unknown>
}

export const useDialogStore = defineStore('dialog', () => {
  const active = ref<ActiveDialog | null>(null)
  const closing = ref<Promise<void> | null>(null)
  const isOpen = ref<boolean>(false)

  return {
    active,
    closing,
    isOpen,
  }
})
