import { useAppStore } from '../../../stores/app'
import { HttpError } from '../client'

import type { ResponseError, ResponseSuccess } from '../client'

const version = import.meta.env.VITE_APP_VERSION

/**
 * Flags update required when the API advertises a newer client version on an error response.
 */
export const responseError: ResponseError = (err) => {
  if (err instanceof HttpError) {
    const clientVersion = err.response.headers.get('x-client-version')

    if (clientVersion && clientVersion !== version) {
      useAppStore().interrupt = { type: 'update' }
    }
  }

  return Promise.reject(err)
}

/**
 * Flags update required when the API advertises a newer client version on a successful response.
 */
export const responseSuccess: ResponseSuccess = (res) => {
  const clientVersion = res.headers.get('x-client-version')

  if (clientVersion && clientVersion !== version) {
    useAppStore().interrupt = { type: 'update' }
  }

  return res
}
