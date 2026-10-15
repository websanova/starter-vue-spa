import { ref } from 'vue'

interface Options {
  onSubmit: () => Promise<unknown>
  onSuccess?: () => void
}

/**
 * Binds an async action to a confirm with no fields, a delete dialog or
 * a one button page. It owns the pending state only. The action is
 * passed in, so this never knows a URI. Like useValidatedForm, a failure
 * is rethrown so callers can handle it themselves, and the message for
 * display comes from useMutationError.
 */
export function useMutationAction(options: Options) {
  const { onSubmit, onSuccess } = options

  const isPending = ref(false)

  async function submit() {
    isPending.value = true

    try {
      await onSubmit()
      onSuccess?.()
    } finally {
      isPending.value = false
    }
  }

  return { submit, isPending }
}
