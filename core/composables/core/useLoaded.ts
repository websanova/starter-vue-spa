import {computed} from 'vue'
// import {useAuthStore} from '@core/stores/core/useAuthStore'
import {useContentStore} from '@core/stores/core/useContentStore'
// import {useI18nStore} from '@core/stores/core/useI18nStore'
// import {useSettingsStore} from '@core/stores/core/useSettingsStore'

export const useLoaded = function() {
    // const auth = useAuthStore()
    const content = useContentStore()
    // const i18n = useI18nStore()
    // const settings = useSettingsStore()

    const isLayoutLoaded = computed(() => {
        return (
            content.isLayoutLoaded// &&
            // i18n.isLayoutLoaded
        )
    })

    const isPageLoaded = computed(() => {
        return (
            content.isPageLoaded// &&
            // i18n.isPageLoaded
        )
    })

    const isSiteLoaded = computed(() => {
        return (
            // auth.isReady &&
            content.isSiteLoaded// &&
            // i18n.isSiteLoaded &&
            // settings.isLoaded
        )
    })

    return {
        isLayoutLoaded,
        isPageLoaded,
        isSiteLoaded,
    }
}
