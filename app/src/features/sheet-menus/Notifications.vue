<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useNotifications } from '@/composables/api/notifications'
  import { useAuthService } from '@shared/composables/services/auth'
  import { Notification } from '@shared/components/common/Notification'
  import NotificationsSheetMenu from '@shared/features/sheet-menus/Notifications.vue'

  withDefaults(defineProps<{
    side?: 'left' | 'right'
    width?: string
    headerHeight?: string
  }>(), {
    side: 'left',
  })

  const router = useRouter()
  const auth = useAuthService()

  const open = defineModel<boolean>('open', { default: false })

  const { data: notifications } = useNotifications(open)

  const pending = computed(() => auth.user.value?.verificationPending ?? [])

  function onVerify(channel: string) {
    router.push({ name: 'auth-verify-account', query: { channel } })
    open.value = false
  }
</script>

<template>
  <NotificationsSheetMenu
    v-model:open="open"
    :side="side"
    :width="width"
    :header-height="headerHeight"
  >
    <div class="flex flex-col gap-3 py-3">
      <Notification
        v-for="channel in pending"
        :key="channel"
        variant="destructive"
        :title="$t(`features.notification.${channel}.title`)"
        :body="$t(`features.notification.${channel}.body`)"
        @action="onVerify(channel)"
      />

      <Notification
        v-for="notification in notifications"
        :key="notification.id"
        :title="notification.title"
        :body="notification.body"
      />
    </div>
  </NotificationsSheetMenu>
</template>
