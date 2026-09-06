<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useResumeSubscription } from '@/composables/api/subscription'
  import { useMutationError } from '@shared/composables/primitives/useMutationError'
  import { useAuthService } from '@shared/composables/services/auth'
  import { useI18n } from '@shared/plugins/i18n'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Stack } from '@shared/components/common/Stack'

  const auth = useAuthService()
  const i18n = useI18n()
  const router = useRouter()

  const resume = useResumeSubscription()

  const isFailed = ref<boolean>(false)
  const isPending = resume.isPending

  const mutationError = useMutationError(resume)

  /**
   * A refusal comes back as an HTTP error and carries its own sentence.
   * Anything else, a dropped connection among them, still gets a line
   * rather than a page that looks like nothing happened.
   */
  const error = computed(() => {
    if (mutationError.value) {
      return mutationError.value
    }

    return isFailed.value ? i18n.t('features.form.subscription_resume.note_failed') : ''
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

  async function submit() {
    isFailed.value = false

    try {
      await resume.mutateAsync()

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
    </Stack>
  </div>
</template>
