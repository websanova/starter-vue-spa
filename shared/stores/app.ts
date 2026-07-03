import { ref } from 'vue'
import { defineStore } from 'pinia'

export type AppInterrupt =
    | { type: 'maintenance'; message: string; retryAfter: number | null }
    | { type: 'update' }

export const useAppStore = defineStore('app', () => {
    const interrupt = ref<AppInterrupt | null>(null)

    return {
        interrupt,
    }
})
