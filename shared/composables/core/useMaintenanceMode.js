import {computed, reactive} from 'vue'
import {useAppStore} from 'SHR_STR/core/useAppStore.js'

export const useMaintenanceMode = function() {
    const app = useAppStore()

    function activate() {
        app.activateMaintenanceMode()
    }

    return {
        activate,
        state: reactive({
            isActive: computed(() => app.state.isMaintenanceMode),
        })
    }
}