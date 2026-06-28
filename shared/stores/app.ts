import { ref } from 'vue'

import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
    const isMaintenanceMode = ref<boolean>(false)
    const isUpdateRequired = ref<boolean>(false)

    return {
        isMaintenanceMode,
        isUpdateRequired,
    }
})
