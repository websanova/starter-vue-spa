import { HttpError } from "./http"

type ValidationBody = { errors: Record<string, string[]> }

function isValidation(err: unknown): err is HttpError & { body: ValidationBody } {
  return err instanceof HttpError && err.status === 422 && !!(err.body as ValidationBody)?.errors
}

/**
* Renames the field keys of a 422 validation error from wire names to domain
* names, then rethrows. Lets a service translate error keys the same way its
* mapper translates the payload, so nothing downstream sees the wire shape.
*/
export async function mapErrorKeys<T>(map: Record<string, string>, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    if (isValidation(err)) {
      err.body.errors = Object.fromEntries(
        Object.entries(err.body.errors).map(([key, messages]) => [map[key] ?? key, messages])
      )
    }
    throw err
  }
}

/**
* Feeds a 422 validation error into a vee-validate form. Returns true when the
* error was a validation error and was applied, false otherwise so the caller
* can let non validation errors bubble to a toast or inline display.
*/
export function applyServerErrors(err: unknown, setErrors: (errors: Record<string, string>) => void): boolean {
  if (!isValidation(err)) return false

  setErrors(
    Object.fromEntries(Object.entries(err.body.errors).map(([key, messages]) => [key, messages[0]]))
  )
  return true
}
