const Index = () => import('@/views/auth/Index.vue')
const Login = () => import('@/views/auth/Login.vue')

export default [{
    path: '/',
    component: Index,
    meta: {
        auth: {
            roles: false,
            redirect: {
                name: 'user-landing'
            }
        },
        i18n: {
            site: ['site']
        },
    },
    children: [{
        path: '',
        name: 'auth-landing',
        redirect: {
            name: 'auth-login'
        }
    }, {
        path: 'login',
        name: 'auth-login',
        component: Login,
    }]
}]
