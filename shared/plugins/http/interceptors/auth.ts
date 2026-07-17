import { useAuth } from '@shared/composables/api/auth'
import { getToken } from '@shared/lib/authToken'
import { HttpError } from '@shared/plugins/http/client'
import { useRouter } from '@shared/plugins/router'

import type { RequestInterceptor, ResponseError } from '@shared/plugins/http/client'

/**
 * Attaches the stored bearer token to outgoing requests.
 */
export const request: RequestInterceptor = (config) => {
  const token = getToken()

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}

/**
 * Flushes auth state and redirects to login on a 401.
 */
export const responseError: ResponseError = (err) => {
  if (err instanceof HttpError && err.response.status === 401) {
    useAuth().flush()
    useRouter().replace({ name: 'auth-login' })
  }

  return Promise.reject(err)
}
