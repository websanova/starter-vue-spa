import { ref } from 'vue'

import { defineStore } from 'pinia'

import type { Auth } from '../models/auth'

export const useAuthStore = defineStore('auth', () => {
  const isReady = ref(false)
  const user = ref<Auth | null>(null)

  return {
    isReady,
    user,
  }
})
