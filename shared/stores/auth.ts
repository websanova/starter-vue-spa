import { ref } from 'vue'

import { defineStore } from 'pinia'

import type { Auth } from '../models/auth'

export const useAuthStore = defineStore('auth', () => {
    const isReady = ref(false)
    const user = ref<Auth | null>(null)

    function activateReady() {
        isReady.value = true
    }

    function deleteToken() {
        localStorage.removeItem('auth_token')
    }

    function deleteUser() {
        user.value = null
    }

    function getToken() {
        return localStorage.getItem('auth_token')
    }

    function setToken(val: string) {
        val = val.replace(/^bearer[:\s]?/i, '')
        localStorage.setItem('auth_token', val)
    }

    function setUser(val: Auth | null) {
        user.value = val
    }

    return {
        isReady,
        user,
        activateReady,
        deleteToken,
        deleteUser,
        getToken,
        setToken,
        setUser,
    }
})
