const Icons       = () => import('APP_VWS/user/Icons.vue')
const Index       = () => import('APP_VWS/user/Index.vue')
const Plans       = () => import('APP_VWS/user/Plans.vue')
const TodoIndex   = () => import('APP_VWS/user/todo/Index.vue')
const TodoInfo    = () => import('APP_VWS/user/todo/Info.vue')
const TodoTasks   = () => import('APP_VWS/user/todo/Tasks.vue')
const Todos       = () => import('APP_VWS/user/Todos.vue')
const UserIndex   = () => import('APP_VWS/user/user/Index.vue')
const UserBilling = () => import('APP_VWS/user/user/Billing.vue')
const UserEdit    = () => import('APP_VWS/user/user/Edit.vue')
const UserInfo    = () => import('APP_VWS/user/user/Info.vue')
const Users       = () => import('APP_VWS/user/Users.vue')

export default [{
    path: '/',
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
        path: 'icons',
        name: 'user-icons',
        component: Icons,
    }, {
        path: 'plans',
        name: 'user-plans',
        component: Plans,
    }, {
        path: 'todos',
        name: 'user-todos',
        component: Todos,
    }, {
        path: 'todos/:todo_id',
        component: TodoIndex,
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
            path: 'info',
            name: 'user-todos-show-info',
            component: TodoInfo,
        }, {
            path: 'tasks',
            name: 'user-todos-show-tasks',
            component: TodoTasks,
        }]
    }, {
        path: 'users/:user_id',
        component: UserIndex,
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
            path: 'edit',
            name: 'user-users-show-edit',
            component: UserEdit,
        }, {
            path: 'info',
            name: 'user-users-show-info',
            component: UserInfo,
        }]
    }, {
        path: 'users',
        name: 'user-users',
        component: Users,
    }]
}]
