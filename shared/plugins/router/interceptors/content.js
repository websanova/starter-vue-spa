import {useContent} from 'SHR_CMP/core/useContent.js'

export async function afterEach(to, from, next) {
    const content = useContent()
    const timeout = from.path !== to.path ? 10 : 0

    setTimeout(function() {
        document.documentElement.style.overflowY = ''

        content.setIsLayoutLoaded(true)
        content.setIsPageLoaded(true)
        content.setIsSiteLoaded(true)
    }, timeout)
}

export async function beforeEach(to, from, next) {
    const content = useContent()
    const toName = (to.name || '').split('-')
    const frName = (from.name || '').split('-')

    let toObj = {
        site: toName[0] ? toName[0] : undefined,
        layout: (toName[0] && toName[1]) ? toName[0] + '-' + toName[1] : undefined,
        page: to.name
    }

    let frObj = {
        site: frName[0] ? frName[0] : undefined,
        layout: (frName[0] && frName[1]) ? frName[0] + '-' + frName[1] : undefined,
        page: from.name
    }

    to.matched.forEach(function(obj) {
        toObj = Object.assign(toObj, obj.meta.content || {})
    })

    from.matched.forEach(function(obj) {
        frObj = Object.assign(frObj, obj.meta.content || {})
    })

    content.setIsLayoutLoaded(frObj.layout === toObj.layout)
    content.setIsPageLoaded(frObj.page === toObj.page)
    content.setIsSiteLoaded(frObj.site === toObj.site)

    if (
        to.path !== from.path &&
        document.documentElement.scrollHeight > document.documentElement.clientHeight
    ) {
        document.documentElement.style.overflowY = 'scroll'
    }

    next()
}