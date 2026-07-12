import auth from './auth'
import error from '@shared/routes/error'
import user from './user'

export default [...auth, ...user, ...error]
