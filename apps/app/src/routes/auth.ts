const Impersonate         = () => import('@/views/auth/Impersonate.vue')
const Index               = () => import('@/views/auth/Index.vue')
const Login               = () => import('@/views/auth/Login.vue')
const PasswordResetSend   = () => import('@/views/auth/PasswordResetSend.vue')
const PasswordResetUpdate = () => import('@/views/auth/PasswordResetUpdate.vue')
const Register            = () => import('@/views/auth/Register.vue')
const Unsubscribe         = () => import('@/views/auth/Unsubscribe.vue')
const VerificationConfirm = () => import('@/views/auth/VerificationConfirm.vue')
const VerificationResend  = () => import('@/views/auth/VerificationResend.vue')

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
    component: Index,
    meta: {
        content: {
            site: 'auth',
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
        path: 'impersonate',
        name: 'auth-impersonate',
        component: Impersonate,
    }, {
        path: 'register',
        name: 'auth-register',
        component: Register,
        meta
    }, {
        path: 'login',
        name: 'auth-login',
        component: Login,
        meta
    }, {
        path: 'password/reset',
        name: 'auth-password-reset-send',
        component: PasswordResetSend,
    }, {
        path: 'password/update',
        name: 'auth-password-reset-update',
        component: PasswordResetUpdate,
    }, {
        path: 'unsubscribe',
        name: 'auth-unsubscribe',
        component: Unsubscribe,
    }, {
        path: 'verify/confirm',
        name: 'auth-verification-confirm',
        component: VerificationConfirm,
    }, {
        path: 'verify/resend',
        name: 'auth-verification-resend',
        component: VerificationResend,
        meta
    }]
}]
