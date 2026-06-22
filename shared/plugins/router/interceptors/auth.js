import {useAuth} from 'SHR_CMP/core/useAuth.js'

export async function beforeEach(to, from, next) {
    const auth = useAuth()
    let meta = {}
    let route

    // Combine all the "auth" meta (they should all be objects).
    to.matched.forEach((matched) => {
        meta = Object.assign(meta, matched.meta.auth || {})
    })

    // NOTE: There should always be a redirect when setting these in the
    //       route meta otherwise it will just get redirected and then
    //       get picked up by the http interrupts likely resuling in 401.
    if ((
        meta.roles === false &&
        auth.state.isLoggedIn
    ) || (
        meta.roles === true &&
        !auth.state.isLoggedIn
    ) || (
        meta.roles &&
        meta.roles.constructor === Array &&
        !meta.roles.includes(auth.state.user.role)
    )) {
        route = meta.redirect
    }

    next(route)
}