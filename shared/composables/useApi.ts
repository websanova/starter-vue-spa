import { ref, shallowRef } from "vue"

/**
* Wraps a single async function and tracks its request state. Each call site
* gets its own data, loading, and error refs so one operation never blocks the
* loading indicator of another. Used for ephemeral calls; state that must
* survive navigation belongs in a store.
*/
export function useApi<TArgs extends unknown[], TResult>(fn: (...args: TArgs) => Promise<TResult>) {
  const data = shallowRef<TResult>()
  const loading = ref(false)
  const error = shallowRef<unknown>(null)

  async function execute(...args: TArgs): Promise<TResult> {
    loading.value = true
    error.value = null

    try {
      const result = await fn(...args)
      data.value = result
      return result
    } catch (e) {
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}
