import {useContentStore} from 'SHR_STR/core/useContentStore.js'

export const useContent = function() {
    const content = useContentStore()

    return {
        setIsLayoutLoaded: content.setIsLayoutLoaded,
        setIsPageLoaded: content.setIsPageLoaded,
        setIsSiteLoaded: content.setIsSiteLoaded,
    }
}