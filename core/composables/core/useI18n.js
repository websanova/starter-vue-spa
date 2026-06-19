import {computed, reactive} from 'vue'
import {useI18n as useI18nPlugin} from 'SHR_PLG/i18n/index.js'
import {useI18nStore} from 'SHR_STR/core/useI18nStore.js'

export const useI18n = function() {
    const i18nStore = useI18nStore()
    const i18nPlugin = useI18nPlugin()
    const types = ['site', 'layout', 'page']

    function setLoaded(typeKey) {
        for (const [key, val] of Object.entries(i18nStore.state.localesLoaded[typeKey])) {
            if (val !== true) {
                return
            }
        }

        i18nStore.setTypeLoaded(typeKey, true)
    }

    function getLocales() {
        const fallbackLocale = i18nPlugin.global.fallbackLocale.value
        const locale = i18nPlugin.global.locale.value
        const locales = []

        if (locale) {
            locales.push(locale)
        }

        if (fallbackLocale && fallbackLocale !== locale) {
            locales.push(fallbackLocale)
        }

        return locales
    }

    function load(args) {
        const locales = getLocales()
        const requests = []

        types.forEach((typeKey) => {
            if (
                args[typeKey] &&
                args[typeKey].length
            ) {
                args[typeKey].forEach((setKey) => {
                    locales.forEach((localeKey) => {
                        const key = localeKey + '-' + setKey

                        if (!i18nStore.state.localesLoaded[typeKey][key]) {
                            i18nStore.setLocaleLoaded(typeKey, key, false)

                            // NOTE: We want to avoid any potential race conditions here by
                            //       firing off requests before setting all flags to false
                            requests.push({
                                key: key,
                                set: setKey,
                                type: typeKey,
                                locale: localeKey
                            })
                        }
                    })
                })
            }

            // NOTE: If empty just update the state to avoid any blocks.
            else {
                setLoaded(typeKey)
            }
        })

        // NOTE: Now that we have a full list of locale files that need to be
        //       loaded we can request them all synchronously and the last one
        //       should get a proper set of locales all loaded and set to true.
        requests.forEach(request)
    }

    function request(args) {
        fetch('/i18n/' + args.locale + '/' + args.set + '.json').then((res) => {
            res.json().then((data) => {
                const message = {[args.set]: data}

                i18nPlugin.global.mergeLocaleMessage(args.locale, message)
                i18nStore.setLocaleLoaded(args.type, args.key, true)

                setLoaded(args.type)
            })
        })
    }

    return {
        load,
        state: reactive({
            isLayoutLoaded: computed(() => i18nStore.state.isLayoutLoaded),
            isPageLoaded: computed(() => i18nStore.state.isPageLoaded),
            isSiteLoaded: computed(() => i18nStore.state.isSiteLoaded),
        })
    }
}