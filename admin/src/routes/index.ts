import auth from './auth'
import error from '@shared/routes/error'
import logout from './logout'
import user from './user'

export default [...auth, ...logout, ...user, ...error]
