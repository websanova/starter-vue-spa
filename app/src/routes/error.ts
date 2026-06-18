const Forbidden = () => import('SHR_VWS/error/Forbidden.vue')
const Index     = () => import('SHR_VWS/error/Index.vue')
const NotFound  = () => import('SHR_VWS/error/NotFound.vue')

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
