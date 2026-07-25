import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { syncKey } from '@/composables/api/sync'
import { useHttp } from '@shared/plugins/http'
import { toNotification } from '@/models/notification'
import type { Notification, NotificationDto } from '@/models/notification'
import type { Sync } from '@/models/sync'
import type { Ref } from 'vue'

const key = ['notifications', { read: 0 }]

/**
 * Fetches the unread notification list. Gated on the passed flag since the
 * sheet menu stays mounted in the layout, so without it the list would load
 * on app boot rather than the first time the menu is opened.
 */
export function useNotifications(enabled: Ref<boolean>) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await useHttp().get<{ data: NotificationDto[] }>('notifications', {
        params: { read: 0 },
      })
      return data.map(toNotification)
    },
    enabled,
    staleTime: 0,
  })
}

/**
 * Marks a notification read and drops it from the cached list. The list
 * only holds unread entries, so the row is removed directly rather than
 * invalidating and refetching for a result already known. The synced
 * unread count is decremented for the same reason, keeping the bell in
 * step with the action instead of lagging until the next poll, which
 * then overwrites it with the authoritative value.
 */
export function useReadNotification() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => useHttp().patch(`notifications/${id}`, { read: true }),
    onSuccess: (_res, id) => {
      qc.setQueryData<Notification[]>(key, (items) => items?.filter((item) => item.id !== id))
      qc.setQueryData<Sync>(syncKey, (sync) => sync && {
        ...sync,
        notificationsUnread: sync.notificationsUnread - 1,
      })
    },
  })
}
