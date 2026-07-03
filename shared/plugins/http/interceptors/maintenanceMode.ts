import { useAppStore } from '../../../stores/app'
import { HttpError } from '../client'

import type { ResponseError } from '../client'

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
