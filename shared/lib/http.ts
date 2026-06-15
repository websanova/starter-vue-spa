type RequestOptions = {
  params?: Record<string, unknown>
  body?: unknown
}

const baseUrl = import.meta.env.VITE_API_URL ?? ""

/**
* Error thrown for any non 2xx response. Carries the status and the parsed
* response body so callers can read validation errors and error codes instead
* of scraping a string. The body is whatever the API returned, parsed as JSON.
*/
export class HttpError extends Error {
  constructor(
    public status: number,
    public body: unknown
  ) {
    super(`Request failed: ${status}`)
    this.name = "HttpError"
  }
}

/**
* Thin typed fetch wrapper. Owns base URL, JSON encoding, and error
* normalization so services and stores never touch fetch directly. Swap the
* internals for axios here without changing any call site.
*/
async function request<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
  const url = new URL(`${baseUrl}${path}`, window.location.origin)

  if (options.params) {
    for (const [key, value] of Object.entries(options.params)) {
      if (value != null) url.searchParams.set(key, String(value))
    }
  }

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: options.body != null ? JSON.stringify(options.body) : undefined
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new HttpError(res.status, body)
  }

  return res.status === 204 ? (undefined as T) : await res.json()
}

export const http = {
  get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>("POST", path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>("PATCH", path, { ...options, body }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>("DELETE", path, options)
}
