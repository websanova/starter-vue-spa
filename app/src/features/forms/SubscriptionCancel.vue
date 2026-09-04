<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCancelSubscription } from '@/composables/api/subscription'
  import { useSubscription } from '@/composables/support/subscription'
  import { useMutationError } from '@shared/composables/primitives/useMutationError'
  import { useAuthService } from '@shared/composables/services/auth'
  import { useI18n } from '@shared/plugins/i18n'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Stack } from '@shared/components/common/Stack'

  const { isOnTrial } = useSubscription()
  const auth = useAuthService()
  const i18n = useI18n()
  const router = useRouter()

  const cancel = useCancelSubscription()

  const isFailed = ref<boolean>(false)
  const isPending = cancel.isPending

  const mutationError = useMutationError(cancel)

  /**
   * A refusal comes back as an HTTP error and carries its own sentence.
   * Anything else, a dropped connection among them, still gets a line
   * rather than a page that looks like nothing happened.
   */
  const error = computed(() => {
    if (mutationError.value) {
      return mutationError.value
    }

    return isFailed.value ? i18n.t('features.form.subscription_cancel.note_failed') : ''
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

  async function submit() {
    isFailed.value = false

    try {
      await cancel.mutateAsync()

      router.push({ name: 'user-account-billing' })
    } catch (err) {
      console.error(err)
      isFailed.value = true
    }
  }
</script>

<template>
  <div class="flex justify-center">
    <Stack class="w-full sm:max-w-[25rem]">
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
    </Stack>
  </div>
</template>
