const Impersonate    = () => import('@/views/auth/Impersonate.vue')
const AuthLayout     = () => import('@/features/layouts/Auth.vue')
const Login          = () => import('@/views/auth/Login.vue')
const PasswordForgot = () => import('@/views/auth/PasswordForgot.vue')
const PasswordReset  = () => import('@/views/auth/PasswordReset.vue')
const Register       = () => import('@/views/auth/Register.vue')
const VerifyAccount  = () => import('@/views/auth/VerifyAccount.vue')

const metaAuthFalse = {
  auth: {
    roles: false,
    redirect: {
      name: 'user-landing'
    }
  }
}

const metaAuthTrue = {
  auth: {
    roles: true,
    redirect: {
      name: 'auth-landing'
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
    path: 'impersonate',
    name: 'auth-impersonate',
    component: Impersonate,
  }, {
    path: 'register',
    name: 'auth-register',
    component: Register,
    meta: metaAuthFalse
  }, {
    path: 'login',
    name: 'auth-login',
    component: Login,
    meta: metaAuthFalse
  }, {
    path: 'forgot-password',
    name: 'auth-password-forgot',
    component: PasswordForgot,
  }, {
    path: 'reset-password',
    name: 'auth-password-reset',
    component: PasswordReset,
  }, {
    path: 'verify-account',
    name: 'auth-verify-account',
    component: VerifyAccount,
    meta: metaAuthTrue
  }]
}]
