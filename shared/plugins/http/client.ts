type QueryParams = Record<string, string | number | boolean | null | undefined>

interface ClientConfig {
  baseURL: string
  credentials?: RequestCredentials
  headers?: Record<string, string>
}

interface RequestConfig {
  url: string
  method: string
  headers: Record<string, string>
  params?: QueryParams
  body?: unknown
  signal?: AbortSignal
}

interface RequestOptions {
  params?: QueryParams
  headers?: Record<string, string>
  signal?: AbortSignal
}

type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>
type ResponseSuccess = (res: Response) => Response | Promise<Response>
type ResponseError = (err: unknown) => unknown

export interface HttpClient {
  get: <T>(url: string, options?: RequestOptions) => Promise<T>
  post: <T>(url: string, body?: unknown, options?: RequestOptions) => Promise<T>
  patch: <T>(url: string, body?: unknown, options?: RequestOptions) => Promise<T>
  delete: <T>(url: string, options?: RequestOptions) => Promise<T>
  interceptors: {
    request: { use: (fn: RequestInterceptor) => void }
    response: { use: (success?: ResponseSuccess | null, error?: ResponseError | null) => void }
  }
}

/**
 * Builds the full request URL, appending any defined query params.
 */
function buildUrl(baseURL: string, url: string, params?: QueryParams): string {
  const base = baseURL.replace(/\/$/, '')
  const full = new URL(`${base}/${url.replace(/^\//, '')}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        full.searchParams.set(key, String(value))
      }
    })
  }

  return full.toString()
}

/**
 * Parses a response body, returning null for empty responses.
 */
async function parseBody<T>(res: Response): Promise<T> {
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return null as T
  }

  return (await res.json()) as T
}

/**
 * Creates an isolated http client bound to its own config and interceptor chains. Equivalent to axios.create: mint as many as you need for separate base URLs.
 */
export function createClient(config: ClientConfig): HttpClient {
  const requestChain: RequestInterceptor[] = []
  const responseChain: { success?: ResponseSuccess | null; error?: ResponseError | null }[] = []

  /**
   * Runs the response error chain, then rejects with the final error. Handlers run in registration order and may transform the error before it propagates.
   */
  async function runResponseError(err: unknown): Promise<never> {
    let current = err

    for (const { error } of responseChain) {
      if (!error) {
        continue
      }

      try {
        current = await error(current)
      } catch (next) {
        current = next
      }
    }

    return Promise.reject(current)
  }

  async function request<T>(method: string, url: string, body?: unknown, options: RequestOptions = {}): Promise<T> {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...config.headers,
      ...options.headers,
    }

    const isForm = body instanceof FormData

    if (body !== undefined && !isForm) {
      headers['Content-Type'] = 'application/json'
    }

    let requestConfig: RequestConfig = {
      url,
      method,
      headers,
      params: options.params,
      body,
      signal: options.signal,
    }

    for (const interceptor of requestChain) {
      requestConfig = await interceptor(requestConfig)
    }

    let res: Response

    try {
      res = await fetch(buildUrl(config.baseURL, requestConfig.url, requestConfig.params), {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: requestConfig.body === undefined
          ? undefined
          : isForm
            ? (requestConfig.body as FormData)
            : JSON.stringify(requestConfig.body),
        credentials: config.credentials,
        signal: requestConfig.signal,
      })
    } catch (err) {
      return runResponseError(err)
    }

    if (!res.ok) {
      return runResponseError(res)
    }

    for (const { success } of responseChain) {
      if (success) {
        res = await success(res)
      }
    }

    return parseBody<T>(res)
  }

  return {
    get: (url, options) => request('GET', url, undefined, options),
    post: (url, body, options) => request('POST', url, body, options),
    patch: (url, body, options) => request('PATCH', url, body, options),
    delete: (url, options) => request('DELETE', url, undefined, options),
    interceptors: {
      request: {
        use: (fn) => {
          requestChain.push(fn)
        },
      },
      response: {
        use: (success, error) => {
          responseChain.push({ success, error })
        },
      },
    },
  }
}
