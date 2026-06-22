const KEY = 'auth_token'

/**
 * Reads the stored bearer token.
 */
export function getToken() {
  return localStorage.getItem(KEY)
}

/**
 * Stores the bearer token, stripping any leading scheme prefix.
 */
export function setToken(val: string) {
  localStorage.setItem(KEY, val.replace(/^bearer[:\s]?/i, ''))
}

/**
 * Removes the stored bearer token.
 */
export function deleteToken() {
  localStorage.removeItem(KEY)
}
