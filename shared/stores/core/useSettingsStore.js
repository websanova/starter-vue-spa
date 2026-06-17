import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
    const data = ref(null)
    const isLoaded = ref(false)

    function setData(val) {
        data.value = val
        isLoaded.value = true
    }

    return {
        setData,
        state: {
            data,
            isLoaded,
        }
    }
})