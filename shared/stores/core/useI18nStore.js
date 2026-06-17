import {computed, ref} from 'vue'
import {defineStore} from 'pinia'

export const useI18nStore = defineStore('i18n', () => {
    const localesLoaded = ref({layout: {}, page: {}, site: {}})
    const typesLoaded = ref({layout: false, page: false, site: false})

    function setTypeLoaded(type, val) {
        typesLoaded.value[type] = val === true ? true : false
    }

    function setLocaleLoaded(type, key, val) {
        localesLoaded.value[type][key] = val === true ? true : false
    }

    return {
        setLocaleLoaded,
        setTypeLoaded,
        state: {
            isLayoutLoaded: computed(() => typesLoaded.value.layout),
            isPageLoaded: computed(() => typesLoaded.value.page),
            isSiteLoaded: computed(() => typesLoaded.value.site),
            localesLoaded,
        }
    }
})