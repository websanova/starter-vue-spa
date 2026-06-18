const Index          = () => import('APP_VWS/base/Index.vue')
const PrivacyPolicy  = () => import('APP_VWS/base/PrivacyPolicy.vue')
const TermsOfService = () => import('APP_VWS/base/TermsOfService.vue')

export default [{
    path: '/',
    name: 'base',
    component: Index,
    meta: {
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
