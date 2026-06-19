import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useDialogStore = defineStore('dialog', () => {
    const current = ref(null)
    const data = ref({})

    function reset() {
        current.value = null
        data.value = {}
    }

    function setCurrent(val, args) {
        current.value = val
        data.value[val] = args
    }

    return {
        reset,
        setCurrent,
        state: {
            current,
            data,
        }
    }
})