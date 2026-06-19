const Account     = () => import('@/views/user/Account.vue')
const Billing     = () => import('@/views/user/Billing.vue')
const Index       = () => import('@/views/user/Index.vue')
const Logout      = () => import('@/views/user/Logout.vue')
const PaymentInfo = () => import('@/views/user/PaymentInfo.vue')
const Plans       = () => import('@/views/user/Plans.vue')
const Settings    = () => import('@/views/user/Settings.vue')
const Subscribe   = () => import('@/views/user/Subscribe.vue')
const Tasks       = () => import('@/views/user/Tasks.vue')
const Todos       = () => import('@/views/user/Todos.vue')
const Unsubscribe = () => import('@/views/user/Unsubscribe.vue')

export default [{
    path: '/u/',
    component: Index,
    meta: {
        auth: {
            roles: true,
            redirect: {name: 'auth-login'}
        },
        content: {
            site: 'user'
        },
        i18n: {
            site: ['site']
        },
    },
    children: [{
        path: '',
        name: 'user-landing',
        redirect: {
            name: 'user-todos'
        }
    }, {
        path: 'account',
        name: 'user-account',
        component: Account,
    }, {
        path: 'billing',
        name: 'user-billing',
        component: Billing,
    }, {
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
    }, {
        path: 'payment-info',
        name: 'user-payment-info',
        component: PaymentInfo,
        meta: {
            isAside: false,
        },
    }, {
        path: 'plans',
        name: 'user-plans',
        component: Plans,
        meta: {
            isAside: false,
        },
    }, {
        path: 'settings',
        name: 'user-settings',
        component: Settings,
    }, {
        path: 'subscribe',
        name: 'user-subscribe',
        component: Subscribe,
        meta: {
            isAside: false,
        },
    }, {
        path: 'todos/:todo_id',
        meta: {
            content: {
                layout: 'todos-show'
            }
        },
        children: [{
            path: '',
            name: 'user-todos-show',
            redirect: {name: 'user-todos-show-tasks'},
        }, {
            path: 'tasks',
            name: 'user-todos-show-tasks',
            component: Tasks,
        }]
    }, {
        path: 'todos',
        name: 'user-todos',
        component: Todos,
    }, {
        path: 'unsubscribe',
        name: 'user-unsubscribe',
        component: Unsubscribe,
        meta: {
            isAside: false,
        },
    }]
}]
