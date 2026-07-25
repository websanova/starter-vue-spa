import { computed } from 'vue'
import { useSync } from '@/composables/api/sync'
import { useAuthService } from '@shared/composables/services/auth'

/**
 * Totals everything waiting in the notifications menu for the bell
 * indicator. The two halves come from different places by necessity. The
 * notification list is only fetched once the menu opens, so its unread
 * total has to come from the polled sync payload, while pending
 * verifications are already carried on the user and stay current through
 * the mutations that change them. Only pending verifications count, as
 * required ones are redirected to the confirm route rather than left
 * sitting in the menu.
 */
export function useNotificationsUnread() {
  const auth = useAuthService()
  const { data } = useSync()

  const unread = computed(() =>
    (data.value?.notificationsUnread ?? 0) +
    (auth.user.value?.verificationPending.length ?? 0)
  )

  return { unread }
}
