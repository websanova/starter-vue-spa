import { computed } from 'vue'

import { useHttp } from '../../plugins/http'
import { useQuery as useQueryClient } from '../../plugins/query'
import { useAuthStore } from '../../stores/auth'
import { profileQuery } from '../api/profile'

export const useAuth = function() {
    const auth = useAuthStore()
    const client = useQueryClient()

    async function refreshToken() {
        return await useHttp().post('refresh')
    }

    async function checkReady() {
        if (!auth.isReady) {
            if (auth.getToken()) {
                await refreshToken()
                await fetchUser()
            }

            auth.activateReady()
        }
    }

    async function fetchUser() {
        const user = await client.fetchQuery(profileQuery())
        auth.setUser(user)
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
        isLoggedIn: computed(() => auth.isReady && !!auth.user),
        isReady: computed(() => auth.isReady),
        user: computed(() => auth.user),
    }
}
