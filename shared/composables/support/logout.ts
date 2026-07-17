import { useRouter } from 'vue-router'
import { useAuth } from '@shared/composables/api/auth'

export const useLogout = function() {
  const { logout } = useAuth()
  const router = useRouter()

  return function onLogout() {
    logout()
    router.push({ name: 'auth-landing' })
  }
}
