import { useRouter } from 'vue-router'
import { useAuthService } from '@shared/composables/services/useAuthService'

export const useLogout = function() {
  const { logout } = useAuthService()
  const router = useRouter()

  return function onLogout() {
    logout()
    router.push({ name: 'auth-landing' })
  }
}
