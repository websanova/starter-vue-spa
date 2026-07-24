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
 * Non HTTP errors are ignored here and belong to the global handler.
 */
export function useMutationError(...mutations: MutationLike[]) {
  return computed(() => {
    const err = mutations.map((m) => m.error.value).find(Boolean)
    return err instanceof HttpError
      ? (err.response.data as { message: string }).message
      : ''
  })
}
