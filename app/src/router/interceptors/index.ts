import * as verification from './verification'
import type { RouterInterceptor } from '@shared/plugins/router'

/**
 * App level interceptors, registered by the shared router after its own
 * chain has run. Order here is the order they run in.
 */
const interceptors: RouterInterceptor[] = [verification]

export default interceptors
