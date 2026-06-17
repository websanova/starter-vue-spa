import {ref} from 'vue'
import {defineStore} from 'pinia'

export const createItemStore = function(namespace) {
    return defineStore(namespace, () => {
        const data = ref({})
        const errors = ref({})
        const fields = ref({})
        const stage = ref({})
        const status = ref(null)

        function decrement(key) {
            data[key]--
        }

        function increment(key) {
            data[key]++
        }

        function remove(key) {
            delete data[key]
        }

        function update(val) {
            data.value = Object.assign(data.value, val)
        }

        function setData(val) {
            data.value = val
        }

        function setErrors(val) {
            errors.value = val
        }

        function setFields(val) {
            fields.value = val
        }

        function setStage(val) {
            stage.value = val
        }

        function setStatus(val) {
            status.value = val
        }

        return {
            decrement,
            increment,
            remove,
            update,

            setData,
            setErrors,
            setFields,
            setStage,
            setStatus,

            state: {
                errors,
                fields,
                data,
                stage,
                status,
            }
        }
    })()
}