<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useSubscription } from '@/composables/current/useSubscription'
  import { useCancelSubscriptionForm } from '@/composables/forms/subscription'
  import { useAuthService } from '@shared/composables/services/useAuthService'
  import { useI18n } from '@shared/plugins/i18n'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Form } from '@shared/components/common/Form'

  const { isOnTrial } = useSubscription()
  const auth = useAuthService()
  const i18n = useI18n()
  const router = useRouter()

  const { submit, isPending, error } = useCancelSubscriptionForm(() => {
    router.push({ name: 'user-account-billing' })
  })

  /**
   * A trial carries its end date on the user and has never been charged,
   * so it can name the day. A paid term carries no renewal date until it
   * has been cancelled, so its sentence puts the term end in words.
   */
  const note = computed(() => {
    const endsAt = auth.user.value?.trial?.endsAt

    if (isOnTrial.value && endsAt) {
      return i18n.t('features.form.subscription_cancel.note_trial', { date: i18n.d(new Date(endsAt), 'short') })
    }

    return i18n.t('features.form.subscription_cancel.note')
  })
</script>

<template>
  <Form>
    <div class="text-center">
      <p class="text-2xl font-bold">
        {{ $t('features.form.subscription_cancel.title') }}
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
      color="destructive"
      :pending="isPending"
      @click="submit"
    >
      {{ $t('features.form.subscription_cancel.submit') }}
    </ButtonLoading>
  </Form>
</template>
