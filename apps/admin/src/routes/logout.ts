const Logout = () => import('@/views/user/Logout.vue')

export default [{
    path: '/logout',
    name: 'user-logout',
    component: Logout,
    meta: {
        auth: {
            roles: true,
            redirect: {name: 'auth-login'}
        },
        i18n: {
            site: ['site']
        },
    }
}]
