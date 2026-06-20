import {computed} from 'vue'
// import {useAuthStore} from '@packages/stores/core/useAuthStore'
import {useContentStore} from '@packages/stores/core/useContentStore'
// import {useI18nStore} from '@packages/stores/core/useI18nStore'
// import {useSettingsStore} from '@packages/stores/core/useSettingsStore'

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
