import { ref } from 'vue'
import { validationMessage } from '@shared/lib/validationMessage'

interface Options<TArgs extends unknown[], TData> {
  onSubmit: (...args: TArgs) => Promise<TData>
  onSuccess?: (data: TData) => void
}

/**
 * Wraps a one off async action with pending and error state. It runs the
 * action, hands the result to onSuccess, and on failure captures the
 * server validation message so the view can render it. Anything that is
 * not a 422 leaves error null for the view to handle.
 */
export function useActionMutation<TArgs extends unknown[], TData>(options: Options<TArgs, TData>) {
  const { onSubmit, onSuccess } = options

  const isPending = ref(false)
  const error = ref<string | null>(null)

  async function submit(...args: TArgs): Promise<TData | undefined> {
    isPending.value = true
    error.value = null

    try {
      const data = await onSubmit(...args)
      onSuccess?.(data)
      return data
    } catch (err) {
      error.value = validationMessage(err)
    } finally {
      isPending.value = false
    }
  }

  return { submit, isPending, error }
}
