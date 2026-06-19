const Forbidden = () => import('@/views/error/Forbidden.vue')
const Index     = () => import('@/views/error/Index.vue')
const NotFound  = () => import('@/views/error/NotFound.vue')

export default [{
    path: '/',
    component: Index,
    meta: {
        i18n: {
           site: ['site'],
        },
    },
    children: [{
        path: '403',
        name: 'error-403',
        component: Forbidden
    }, {
        path: ':catchAll(.*)',
        name: 'error-404',
        component: NotFound
    }]
}]
