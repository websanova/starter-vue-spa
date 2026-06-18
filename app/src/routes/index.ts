import auth from './auth'
import base from './base'
import error from './error'
import logout from './logout'
import user from './user'

export default [...auth, ...base, ...logout, ...user, ...error]
