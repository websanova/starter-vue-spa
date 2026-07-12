import auth from './auth'
import error from '@shared/routes/error'
import console from './console'

export default [...auth, ...console, ...error]
