import {computed, reactive} from 'vue'
import {useAppStore} from 'SHR_STR'

// NOTE: This works with some hard codes in the index.html so that the theme class
//       is set right away and avoids any flicker that coudl happen if the manually
//       set theme doesn't match the browsers default setting.
export const useDarkMode = function() {
    const app = useAppStore()

    function toggle() {
        app.toggleDarkMode()
        document.documentElement.classList[(app.state.isDarkMode ? 'add' : 'remove')]('color-scheme-dark')
    }

    return {
        toggle,
        state: reactive({
            isActive: computed(() => app.state.isDarkMode),
        })
    }
}