import { computed } from 'vue'
import { HttpError } from '@shared/plugins/http/client'
import { useI18n } from '@shared/plugins/i18n'
import type { Ref } from 'vue'

interface MutationLike {
  error: Ref<Error | null>
}

/**
 * Maps one or more mutations onto a single display message. The first
 * mutation holding an HttpError wins, so sibling actions that share an
 * error spot pass themselves together as an array and reset each other
 * on fire. Non HTTP errors, and HTTP errors with no message, show the
 * optional fallback string. Without one they show a generic request
 * failed line.
 */
export function useMutationError(source: MutationLike | MutationLike[], fallback?: string) {
  const i18n = useI18n()

  const mutations = Array.isArray(source) ? source : [source]

  return computed(() => {
    const err = mutations.map((m) => m.error.value).find(Boolean)
    const failed = fallback ?? i18n.t('site.common.error.request_failed')

    if (err instanceof HttpError) {
      return (err.response.data as { message?: string } | null)?.message ?? failed
    }

    return err ? failed : ''
  })
}
