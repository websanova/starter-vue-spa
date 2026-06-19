import {computed, reactive} from 'vue'
import {useAppStore} from 'SHR_STR/core/useAppStore.js'

export const useUpdateRequired = function() {
    const app = useAppStore()

    function activate() {
        app.activateUpdateRequired()
    }

    return {
        activate,
        state: reactive({
            isActive: computed(() => app.state.isUpdateRequired),
        })
    }
}