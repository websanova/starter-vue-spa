import { ref } from 'vue'

import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', () => {
    const isLayoutLoaded = ref<boolean>(false)
    const isPageLoaded = ref<boolean>(false)
    const isSiteLoaded = ref<boolean>(false)

    return {
        isLayoutLoaded,
        isPageLoaded,
        isSiteLoaded,
    }
})
