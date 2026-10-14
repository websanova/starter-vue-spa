import auth from './auth'
import error from '@shared/router/routes/error'
import oauth from '@shared/router/routes/oauth'
import console from './console'

export default [...auth, ...console, ...oauth, ...error]
