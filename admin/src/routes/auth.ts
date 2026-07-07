const AuthLayout = () => import('@/features/layouts/Auth.vue')
const Login = () => import('@/views/auth/Login.vue')

const meta = {
    auth: {
        roles: false,
        redirect: {
            name: 'user-landing'
        }
    }
}

export default [{
    path: '/',
    component: AuthLayout,
    meta: {
        content: {
            site: 'auth',
        },
        i18n: {
            site: ['features', 'rules', 'site']
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
        meta
    }]
}]
