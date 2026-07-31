const Layout            = () => import('@/features/layouts/User.vue')
const LayoutAccount     = () => import('@/features/layouts/UserAccount.vue')
const LayoutBookmarks   = () => import('@/features/layouts/UserBookmarks.vue')
const LayoutSubscribe   = () => import('@/features/layouts/UserSubscribe.vue')

const AccountBilling    = () => import('@/views/user/account/Billing.vue')
const AccountProfile    = () => import('@/views/user/account/Profile.vue')
const AccountSecurity   = () => import('@/views/user/account/Security.vue')
const AccountSettings   = () => import('@/views/user/account/Settings.vue')

const BookmarksList     = () => import('@/views/user/bookmarks/List.vue')

const SubscribeCancel   = () => import('@/views/user/subscribe/Cancel.vue')
const SubscribeCheckout = () => import('@/views/user/subscribe/Checkout.vue')
const SubscribePlans    = () => import('@/views/user/subscribe/Plans.vue')
const SubscribeResume   = () => import('@/views/user/subscribe/Resume.vue')

export default [{
  path: '/u/',
  component: Layout,
  meta: {
    auth: {
      roles: true,
      redirect: {name: 'auth-login'}
    },
    content: {
      site: 'user'
    },
    i18n: {
      site: ['features', 'rules', 'site']
    },
  },
  children: [{
    path: '',
    name: 'user-landing',
    redirect: {
      name: 'user-bookmarks'
    }
  }, {
    path: 'account',
    component: LayoutAccount,
    meta: {
      content: {
        layout: 'account'
      }
    },
    children: [{
      path: '',
      name: 'user-account',
      redirect: {
        name: 'user-account-profile'
      }
    }, {
      path: 'billing',
      name: 'user-account-billing',
      component: AccountBilling
    }, {
      path: 'profile',
      name: 'user-account-profile',
      component: AccountProfile
    }, {
      path: 'security',
      name: 'user-account-security',
      component: AccountSecurity
    }, {
      path: 'settings',
      name: 'user-account-settings',
      component: AccountSettings
    }]
  }, {
    path: 'bookmarks',
    component: LayoutBookmarks,
    meta: {
      content: {
        layout: 'bookmarks'
      }
    },
    children: [{
      path: '',
      name: 'user-bookmarks',
      component: BookmarksList
    }]
  }, {
    path: 'subscribe',
    name: 'user-subscribe',
    component: LayoutSubscribe,
    meta: {
      content: {
        layout: 'subscribe'
      }
    },
    children: [{
      path: 'cancel',
      name: 'user-subscribe-cancel',
      component: SubscribeCancel
    }, {
      path: 'checkout',
      name: 'user-subscribe-checkout',
      component: SubscribeCheckout
    }, {
      path: 'plans',
      name: 'user-subscribe-plans',
      component: SubscribePlans
    }, {
      path: 'resume',
      name: 'user-subscribe-resume',
      component: SubscribeResume
    }]
  }]
}]
