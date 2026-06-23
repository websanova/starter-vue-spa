import { useAppStore } from '../../../stores/app'
import { HttpError } from '../client'

import type { ResponseError } from '../client'

/**
 * Activates maintenance mode when the API reports it in the error body.
 */
export const responseError: ResponseError = (err) => {
  if (err instanceof HttpError && (err.response.data as { code?: string })?.code === 'MaintenanceMode') {
    useAppStore().activateMaintenanceMode()
  }

  return Promise.reject(err)
}
