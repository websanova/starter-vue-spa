const Account     = () => import('APP_VWS/user/Account.vue')
const Billing     = () => import('APP_VWS/user/Billing.vue')
const Index       = () => import('APP_VWS/user/Index.vue')
const PaymentInfo = () => import('APP_VWS/user/PaymentInfo.vue')
const Plans       = () => import('APP_VWS/user/Plans.vue')
const Settings    = () => import('APP_VWS/user/Settings.vue')
const Subscribe   = () => import('APP_VWS/user/Subscribe.vue')
const Tasks       = () => import('APP_VWS/user/Tasks.vue')
const Todos       = () => import('APP_VWS/user/Todos.vue')
const Unsubscribe = () => import('APP_VWS/user/Unsubscribe.vue')

export default [{
    path: '/u/',
    component: Index,
    meta: {
        auth: {
            roles: true,
            redirect: {name: 'auth-login'}
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
