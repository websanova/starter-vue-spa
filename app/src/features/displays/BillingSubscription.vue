<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useSubscription } from '@/composables/support/subscription'
  import { Button } from '@shared/components/ui/button'
  import { Inline } from '@shared/components/common/Inline'
  import { Stack } from '@shared/components/common/Stack'
  import type { StatusAction } from '@/composables/support/subscription'

  /**
   * Each action lands on the subscribe route guarded for the same state,
   * so the buttons on offer and the routes that will accept them cannot
   * drift apart. Update goes to the plans page rather than straight to
   * the update page, since the new plan has to be picked first.
   */
  const routes: Record<StatusAction, string> = {
    cancel: 'user-subscribe-cancel',
    resume: 'user-subscribe-resume',
    update: 'user-subscribe-plans',
  }

  const { status, statusActions } = useSubscription()
  const router = useRouter()

  function onAction(action: StatusAction) {
    router.push({ name: routes[action] })
  }
</script>

<template>
  <Stack gap="sm">
    <p>
      {{ $t(`features.display.billing_subscription.status.${status.key}`, status.params) }}
    </p>

    <Inline>
      <Button
        v-for="action in statusActions"
        :key="action"
        :variant="action === 'cancel' ? 'outline' : 'solid'"
        :color="action === 'cancel' ? 'destructive' : 'primary'"
        @click="onAction(action)"
      >
        {{ $t(`features.display.billing_subscription.action.${action}`) }}
      </Button>
    </Inline>
  </Stack>
</template>
