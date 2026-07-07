const ErrorLayout = () => import('@shared/features/layouts/Error.vue')
const Forbidden = () => import('@shared/views/error/Forbidden.vue')
const NotFound = () => import('@shared/views/error/NotFound.vue')

export default [{
    path: '/',
    component: ErrorLayout,
    meta: {
        content: {
            site: 'error'
        },
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
