import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useContentStore = defineStore('content', () => {
    const isLayoutLoaded = ref(false)
    const isPageLoaded = ref(false)
    const isSiteLoaded = ref(false)

    function setIsLayoutLoaded(val: boolean) {
        isLayoutLoaded.value = val
    }

    function setIsPageLoaded(val: boolean) {
        isPageLoaded.value = val
    }

    function setIsSiteLoaded(val: boolean) {
        isSiteLoaded.value = val
    }

    return {
        isLayoutLoaded,
        isPageLoaded,
        isSiteLoaded,
        setIsLayoutLoaded,
        setIsPageLoaded,
        setIsSiteLoaded,
    }
})
