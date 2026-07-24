<script setup lang="ts">
  import { computed } from 'vue'
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

  const auth = useAuthService()

  const open = defineModel<boolean>('open', { default: false })

  const pending = computed(() => auth.user.value?.verificationPending ?? [])
</script>

<template>
  <NotificationsSheetMenu
    v-model:open="open"
    :side="side"
    :width="width"
    :header-height="headerHeight"
  >
    <Notification
      v-for="channel in pending"
      :key="channel"
      :title="$t(`features.notification.${channel}.title`)"
      :body="$t(`features.notification.${channel}.body`)"
    />
  </NotificationsSheetMenu>
</template>
