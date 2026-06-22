import { ref } from 'vue'

import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
    const isDarkMode = ref(
        localStorage.getItem('color-scheme') === 'dark' ||
        (!localStorage.getItem('color-scheme') && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
    const isAuthReady = ref(false)
    const isMaintenanceMode = ref(false)
    const isUpdateRequired = ref(false)

    function activateAuthReady() {
        isAuthReady.value = true
    }

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
        isAuthReady,
        isDarkMode,
        isMaintenanceMode,
        isUpdateRequired,
        activateAuthReady,
        activateMaintenanceMode,
        activateUpdateRequired,
        toggleDarkMode,
    }
})
