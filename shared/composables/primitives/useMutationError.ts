import { computed } from 'vue'
import { HttpError } from '@shared/plugins/http/client'
import type { Ref } from 'vue'

interface MutationLike {
  error: Ref<Error | null>
}

/**
 * Maps one or more mutations onto a single display message. The first
 * mutation holding an HttpError wins, so sibling actions that share an
 * error spot pass themselves together and reset each other on fire.
 * Non HTTP errors, and HTTP errors with no message, show the optional
 * trailing fallback string. Without one they show nothing.
 */
export function useMutationError(...args: [...MutationLike[], string] | MutationLike[]) {
  const mutations = args.filter((arg): arg is MutationLike => typeof arg !== 'string')
  const fallback = args.find((arg): arg is string => typeof arg === 'string') ?? ''

  return computed(() => {
    const err = mutations.map((m) => m.error.value).find(Boolean)

    if (err instanceof HttpError) {
      return (err.response.data as { message?: string } | null)?.message ?? fallback
    }

    return err ? fallback : ''
  })
}
