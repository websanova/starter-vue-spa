<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useResumeSubscriptionForm } from '@/composables/forms/subscription'
  import { useAuthService } from '@shared/composables/services/useAuthService'
  import { useI18n } from '@shared/plugins/i18n'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Form } from '@shared/components/common/Form'

  const auth = useAuthService()
  const i18n = useI18n()
  const router = useRouter()

  const { submit, isPending, error } = useResumeSubscriptionForm(() => {
    router.push({ name: 'user-account-billing' })
  })

  /**
   * The end date the cancellation set is also the day billing picks
   * back up, since resuming leaves the renewal where it always was.
   */
  const note = computed(() => {
    const user = auth.user.value
    const interval = user?.subscription?.interval
    const endsAt = user?.subscription?.endsAt

    return i18n.t('features.form.subscription_resume.note', {
      plan: user?.plan?.name ?? '',
      interval: interval ? i18n.t(`site.units.interval.billed.${interval}`) : '',
      date: endsAt ? i18n.d(new Date(endsAt), 'short') : '',
    })
  })
</script>

<template>
  <Form>
    <div class="text-center">
      <p class="text-2xl font-bold">
        {{ $t('features.form.subscription_resume.title') }}
      </p>

      <p class="text-lg text-muted-foreground">
        {{ note }}
      </p>
    </div>

    <p
      v-if="error"
      class="text-center text-destructive"
    >
      {{ error }}
    </p>

    <ButtonLoading
      class="w-full"
      :pending="isPending"
      @click="submit"
    >
      {{ $t('features.form.subscription_resume.submit') }}
    </ButtonLoading>
  </Form>
</template>
