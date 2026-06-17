import {useI18n} from 'SHR_CMP/core/useI18n.js'

export async function beforeEach(to, from, next) {
    const i18n = useI18n()

    const toObj = {layout: [], page: [], site: []}

    to.matched.forEach(function(obj) {
        toObj.layout = toObj.layout.concat((obj.meta.i18n || {}).layout || [])
        toObj.page = toObj.page.concat((obj.meta.i18n || {}).page || [])
        toObj.site = toObj.site.concat((obj.meta.i18n || {}).site || [])
    })

    i18n.load(toObj)

    next()
}