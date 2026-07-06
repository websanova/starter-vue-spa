import type { App } from 'vue'

import { createClient, type HttpClient } from './client'
import * as auth from './interceptors/auth'
import * as maintenanceMode from './interceptors/maintenanceMode'
import * as updateRequired from './interceptors/updateRequired'

let instance: HttpClient

/**
 * Builds the default http client and registers shared interceptors in order. The instance is exposed through useHttp for requests in non component code. Additional clients for other base URLs can be minted directly with createClient.
 */
function createHttp(_app: App) {
  instance = createClient({
    baseURL: import.meta.env.VITE_API_URL ?? '',
  })

  // NOTE: Order here matters
  instance.interceptors.request.use(auth.request)
  instance.interceptors.response.use(null, auth.responseError)
  instance.interceptors.response.use(null, maintenanceMode.responseError)
  instance.interceptors.response.use(updateRequired.responseSuccess, updateRequired.responseError)
}

function useHttp() {
  return instance
}

export { createHttp, useHttp }
