const Impersonate         = () => import('APP_VWS/auth/Impersonate.vue')
const Index               = () => import('APP_VWS/auth/Index.vue')
const Login               = () => import('APP_VWS/auth/Login.vue')
const PasswordResetSend   = () => import('APP_VWS/auth/PasswordResetSend.vue')
const PasswordResetUpdate = () => import('APP_VWS/auth/PasswordResetUpdate.vue')
const Register            = () => import('APP_VWS/auth/Register.vue')
const Unsubscribe         = () => import('APP_VWS/auth/Unsubscribe.vue')
const VerificationConfirm = () => import('APP_VWS/auth/VerificationConfirm.vue')
const VerificationResend  = () => import('APP_VWS/auth/VerificationResend.vue')

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
    name: 'auth',
    component: Index,
    meta: {
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
