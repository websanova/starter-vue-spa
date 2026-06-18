const Index = () => import('APP_VWS/auth/Index.vue')
const Login = () => import('APP_VWS/auth/Login.vue')

export default [{
    path: '/',
    name: 'auth',
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
