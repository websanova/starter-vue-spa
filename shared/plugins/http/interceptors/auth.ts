import { useAuth } from '../../../composables/support/auth'
import { getToken, setToken } from '../../../lib/authToken'
import { useRouter } from '../../router'
import { HttpError } from '../client'

import type { RequestInterceptor, ResponseError, ResponseSuccess } from '../client'

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
 * Captures a refreshed token from the response authorization header.
 */
export const responseSuccess: ResponseSuccess = (res) => {
  const token = res.headers.get('authorization')

  if (token) {
    setToken(token)
  }

  return res
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
