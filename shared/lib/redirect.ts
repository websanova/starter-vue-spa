import type { LocationQuery } from 'vue-router'

/**
 * Reads the redirect query param and returns it only when it is an internal
 * path. Absolute and protocol relative urls are dropped so the param cannot
 * send the user off site.
 */
export function getRedirect(query: LocationQuery) {
  const value = query.redirect

  if (typeof value !== 'string') {
    return null
  }

  if (!value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return null
  }

  return value
}
