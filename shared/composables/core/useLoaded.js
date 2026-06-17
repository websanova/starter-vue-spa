import {computed, reactive} from 'vue'
// import {useAuthStore} from 'SHR_STR/core/useAuthStore.js'
import {useContentStore} from 'SHR_STR/core/useContentStore.js'
// import {useI18nStore} from 'SHR_STR/core/useI18nStore.js'
// import {useSettingsStore} from 'SHR_STR/core/useSettingsStore.js'

export const useLoaded = function() {
    // const auth = useAuthStore()
    const content = useContentStore()
    // const i18n = useI18nStore()
    // const settings = useSettingsStore()

    const isLayoutLoaded = computed(() => {
        return (
            content.state.isLayoutLoaded// &&
            // i18n.state.isLayoutLoaded
        )
    })

    const isPageLoaded = computed(() => {
        return (
            content.state.isPageLoaded// &&
            // i18n.state.isPageLoaded
        )
    })

    const isSiteLoaded = computed(() => {
        return (
            // auth.state.isReady &&
            content.state.isSiteLoaded// &&
            // i18n.state.isSiteLoaded &&
            // settings.state.isLoaded
        )
    })

    return {
        state: reactive({
            isLayoutLoaded,
            isPageLoaded,
            isSiteLoaded,
        })
    }
}