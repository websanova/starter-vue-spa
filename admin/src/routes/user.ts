const Layout        = () => import('@/features/layouts/User.vue')
const LayoutUser    = () => import('@/features/layouts/UserUser.vue')

const Icons         = () => import('@/views/user/Icons.vue')
const Plans         = () => import('@/views/user/Plans.vue')
const Users         = () => import('@/views/user/Users.vue')

const UserBilling   = () => import('@/views/user/user/Billing.vue')
const UserBookmarks = () => import('@/views/user/user/Bookmarks.vue')
const UserEdit      = () => import('@/views/user/user/Edit.vue')
const UserFolders   = () => import('@/views/user/user/Folders.vue')
const UserInfo      = () => import('@/views/user/user/Info.vue')

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
        component: LayoutUser,
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
