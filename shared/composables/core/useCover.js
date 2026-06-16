export const useCover = function() {
     function remove() {
        ['cover', 'script', 'style'].forEach((key) => {
            const el = document.getElementById(key + '-init')

            if (el) {
                el.remove()
            }
        })
    }

    return {
        remove,
    }
}