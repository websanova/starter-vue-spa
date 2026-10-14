import auth from './auth'
import base from './base'
import error from '@shared/router/routes/error'
import oauth from '@shared/router/routes/oauth'
import user from './user'

export default [...auth, ...base, ...user, ...oauth, ...error]
