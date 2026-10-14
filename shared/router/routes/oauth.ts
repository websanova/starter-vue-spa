const AuthLayout = () => import('@shared/features/layouts/Auth.vue')
const Authorize = () => import('@shared/views/oauth/Authorize.vue')

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
    path: 'oauth/authorize',
    name: 'auth-oauth-authorize',
    component: Authorize,
  }]
}]
