import { HttpError } from '@shared/plugins/http/client'
import { useAppStore } from '@shared/stores/app'

import type { ResponseError } from '@shared/plugins/http/client'

/**
 * Activates maintenance mode when the API responds with a 503.
 */
export const responseError: ResponseError = (err) => {
  if (err instanceof HttpError && err.response.status === 503) {
    const message = (err.response.data as { message?: string })?.message ?? ''
    const retryAfterHeader = err.response.headers.get('retry-after')
    const retryAfter = retryAfterHeader ? Number(retryAfterHeader) : null

    useAppStore().interrupt = { type: 'maintenance', message, retryAfter }
  }

  return Promise.reject(err)
}
