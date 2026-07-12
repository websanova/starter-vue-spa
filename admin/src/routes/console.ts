const Layout        = () => import('@/features/layouts/Console.vue')
const LayoutConsole = () => import('@/features/layouts/ConsoleUser.vue')

const Icons         = () => import('@/views/console/Icons.vue')
const Plans         = () => import('@/views/console/Plans.vue')
const Users         = () => import('@/views/console/Users.vue')

const UserBilling   = () => import('@/views/console/user/Billing.vue')
const UserBookmarks = () => import('@/views/console/user/Bookmarks.vue')
const UserEdit      = () => import('@/views/console/user/Edit.vue')
const UserFolders   = () => import('@/views/console/user/Folders.vue')
const UserInfo      = () => import('@/views/console/user/Info.vue')

export default [{
    path: '/',
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
            name: 'user-users'
        }
    }, {
        path: 'icons',
        name: 'user-icons',
        component: Icons,
        meta: {
            content: {
                layout: 'icons'
            }
        }
    }, {
        path: 'plans',
        name: 'user-plans',
        component: Plans,
        meta: {
            content: {
                layout: 'plans'
            }
        }
    }, {
        path: 'users',
        name: 'user-users',
        component: Users,
        meta: {
            content: {
                layout: 'users'
            }
        }
    }, {
        path: 'users/:user_id',
        component: LayoutConsole,
        meta: {
            content: {
                layout: 'users-show'
            }
        },
        children: [{
            path: '',
            name: 'user-users-show',
            redirect: {name: 'user-users-show-edit'},
        }, {
            path: 'billing',
            name: 'user-users-show-billing',
            component: UserBilling,
        }, {
            path: 'bookmarks',
            name: 'user-users-show-bookmarks',
            component: UserBookmarks,
        }, {
            path: 'edit',
            name: 'user-users-show-edit',
            component: UserEdit,
        }, {
            path: 'folders',
            name: 'user-users-show-folders',
            component: UserFolders,
        }, {
            path: 'info',
            name: 'user-users-show-info',
            component: UserInfo,
        }]
    }]
}]
