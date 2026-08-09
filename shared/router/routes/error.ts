const ErrorLayout = () => import('@shared/features/layouts/Error.vue')
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
        path: ':catchAll(.*)',
        name: 'error-404',
        component: NotFound
    }]
}]
