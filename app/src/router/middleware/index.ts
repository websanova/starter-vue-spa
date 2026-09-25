import * as verification from './verification'
import type { RouterMiddleware } from '@shared/plugins/router'

/**
 * App level middleware, registered by the shared router after its own
 * chain has run. Order here is the order they run in.
 */
const middleware: RouterMiddleware[] = [verification]

export default middleware
