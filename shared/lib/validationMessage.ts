import { HttpError } from '@shared/plugins/http/client'

/**
 * Reads the first validation message from a 422 response, or null when
 * the error is not a 422 with the expected body shape. Lets callers show
 * the server message without re-parsing the error each time.
 */
export function validationMessage(err: unknown): string | null {
  if (err instanceof HttpError && err.response.status === 422) {
    const body = err.response.data as { errors?: Record<string, string[]> }
    return Object.values(body.errors ?? {})[0]?.[0] ?? null
  }

  return null
}
