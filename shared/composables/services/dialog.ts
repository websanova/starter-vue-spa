import { computed } from 'vue'
import { useDialogStore } from '@shared/stores/dialog'
import type { DialogName, DialogProps } from '@/config/dialogs'

/**
 * How long a closed dialog stays mounted before it is removed. It has to
 * outlast the duration-200 close animation on ui/dialog/DialogContent.vue,
 * ui/dialog/DialogScrollContent.vue and ui/alert-dialog/AlertDialogContent.vue,
 * so change it along with those.
 */
const CLOSE_DELAY = 250

export const useDialogService = function() {
  const store = useDialogStore()

  /**
   * The dialog is hidden first so it can animate out, then unmounted once
   * the animation is done, so the next open always starts from a fresh mount.
   */
  function close(): Promise<void> {
    if (store.closing) {
      return store.closing
    }

    if (!store.active) {
      return Promise.resolve()
    }

    store.isOpen = false

    const closing = new Promise<void>((resolve) => {
      setTimeout(() => {
        store.active = null
        store.closing = null
        resolve()
      }, CLOSE_DELAY)
    })

    store.closing = closing

    return closing
  }

  /**
   * Only one dialog is open at a time, so whatever is showing is closed
   * and waited out before the next one mounts.
   */
  async function open<K extends DialogName>(
    name: K,
    ...args: {} extends DialogProps<K> ? [props?: DialogProps<K>] : [props: DialogProps<K>]
  ) {
    await close()

    store.active = { name, props: args[0] ?? {} }
    store.isOpen = true
  }

  return {
    active: computed(() => store.active),
    isOpen: computed(() => store.isOpen),
    close,
    open,
  }
}
