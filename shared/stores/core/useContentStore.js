import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useContentStore = defineStore('content', () => {
    const isLayoutLoaded = ref(false)
    const isPageLoaded = ref(false)
    const isSiteLoaded = ref(false)

    function setIsLayoutLoaded(val) {
        isLayoutLoaded.value = val === true ? true : false
    }

    function setIsPageLoaded(val) {
        isPageLoaded.value = val === true ? true : false
    }

    function setIsSiteLoaded(val) {
        isSiteLoaded.value = val === true ? true : false
    }

    return {
        setIsLayoutLoaded,
        setIsPageLoaded,
        setIsSiteLoaded,
        state: {
            isLayoutLoaded,
            isPageLoaded,
            isSiteLoaded,
        },
    }
})