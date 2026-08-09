import auth from './auth'
import error from '@shared/router/routes/error'
import console from './console'

export default [...auth, ...console, ...error]
