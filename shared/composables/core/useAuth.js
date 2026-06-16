import {computed, reactive} from 'vue'
import {useHttp} from 'SHR_PLG/http/index.js'
import {useAuthStore} from 'SHR_STR/core/useAuthStore.js'
import model from 'SHR_MDL/user.js'

export const useAuth = function() {
    const auth = useAuthStore()
    const http = useHttp()

    async function refreshToken() {
        return await http.request({url: 'refresh', method: 'post'})
    }

    async function checkReady() {
        if (!auth.state.isReady) {
            if (auth.getToken()) {
                await refreshToken()
                await fetchUser()
            }

            auth.activateReady()
        }
    }

    async function fetchUser() {
        const res = await http.request({url: 'me'})
        auth.setUser(res.data.data)
    }

    function flush() {
        auth.deleteUser()
        auth.deleteToken()
    }

    return {
        checkReady,
        fetchUser,
        flush,
        getToken: auth.getToken,
        refreshToken,
        setToken: auth.setToken,
        state: reactive({
            isLoggedIn: computed(() => auth.state.isReady && auth.state.user),
            isReady: computed(() => auth.state.isReady),
            user: computed(() => auth.state.user ? model(auth.state.user) : {}),
        })
    }
}

