import { useQuery } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toNotification } from '@/models/notification'
import type { NotificationDto } from '@/models/notification'
import type { Ref } from 'vue'

const key = ['notifications']

/**
 * Fetches the notification list. Gated on the passed flag since the sheet
 * menu stays mounted in the layout, so without it the list would load on
 * app boot rather than the first time the menu is opened.
 */
export function useNotifications(enabled: Ref<boolean>) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await useHttp().get<{ data: NotificationDto[] }>('notifications')
      return data.map(toNotification)
    },
    enabled,
  })
}
