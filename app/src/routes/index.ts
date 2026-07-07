import auth from './auth'
import base from './base'
import error from '@shared/routes/error'
import user from './user'

export default [...auth, ...base, ...user, ...error]
