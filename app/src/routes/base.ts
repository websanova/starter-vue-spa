const Index          = () => import('@/views/base/Index.vue')
const PrivacyPolicy  = () => import('@/views/base/PrivacyPolicy.vue')
const TermsOfService = () => import('@/views/base/TermsOfService.vue')

export default [{
    path: '/',
    component: Index,
    meta: {
        content: {
            site: 'base'
        },
        i18n: {
            site: ['site']
        },
    },
    children: [{
        path: 'privacy-policy',
        name: 'base-pp',
        component: PrivacyPolicy,
        meta: {
            i18n: {
                layout: ['pp']
            }
        }
    }, {
        path: 'terms-of-service',
        name: 'base-tos',
        component: TermsOfService,
        meta: {
            i18n: {
                layout: ['tos']
            }
        }
    }]
}]
