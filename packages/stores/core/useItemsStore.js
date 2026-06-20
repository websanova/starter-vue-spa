import {ref} from 'vue'
import {defineStore} from 'pinia'

export const createItemsStore = function(namespace) {
    return defineStore(namespace, () => {
        const data = ref({})
        const errors = ref({})
        const fields = ref({})
        const stage = ref({})
        const status = ref(null)

        function append(item) {
            data.value.items.push(item)
            data.value.total++
        }

        function decrement(item, key) {
            const itemFound = data.value.items.find((i) => i.id == item.id)

            if (itemFound) {
                itemFound[key]--
            }
        }

        function increment(item, key) {
            const itemFound = data.value.items.find((i) => i.id == item.id)

            if (itemFound) {
                itemFound[key]++
            }
        }

        function prepend(item) {
            data.value.items.unshift(item)
            data.value.total++
        }

        function remove(item) {
            const index = data.value.items.findIndex((i) => i.id == item.id)

            if (index > -1) {
                data.value.items.splice(index, 1)
                data.value.total--
            }
        }

        function update(item, val) {
            const index = (data.value.items || []).findIndex((i) => i.id == item.id)

            if (index > -1) {
                data.value.items[index] = Object.assign(data.value.items[index], val)
            }
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
            append,
            decrement,
            increment,
            prepend,
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