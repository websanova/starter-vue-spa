import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useAppStore = defineStore('app', () => {
    const isDarkMode = ref(
        localStorage.getItem('color-scheme') === 'dark' ||
        (!localStorage.getItem('color-scheme') && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
    const isMaintenanceMode = ref(false)
    const isUpdateRequired = ref(false)

    function activateMaintenanceMode() {
        isMaintenanceMode.value = true
    }

    function activateUpdateRequired() {
        isUpdateRequired.value = true
    }

    function toggleDarkMode() {
        isDarkMode.value = !isDarkMode.value
        localStorage.setItem('color-scheme', isDarkMode.value ? 'dark' : 'light')
    }

    return {
        activateMaintenanceMode,
        activateUpdateRequired,
        toggleDarkMode,
        state: {
            isDarkMode,
            isUpdateRequired,
            isMaintenanceMode,
        }
    }
})