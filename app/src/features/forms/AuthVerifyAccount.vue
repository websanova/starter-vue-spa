<script setup lang="ts">
  import { computed } from 'vue'
  import { useVerificationForm } from '@/composables/forms/verification'
  import { useAuthService } from '@shared/composables/services/useAuthService'
  import { useLogout } from '@shared/composables/support/useLogout'
  import { useSettingsStore } from '@shared/stores/settings'
  import { Button } from '@shared/components/ui/button'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Form, FormButton } from '@shared/components/common/Form'
  import { InputOTP, InputOTPGroup, InputOTPSlot } from '@shared/components/ui/input-otp'

  const auth = useAuthService()
  const settings = useSettingsStore()
  const onLogout = useLogout()

  const { channel, code, error, isPending, isResending, resend, submit } = useVerificationForm()

  const length = computed(() => settings.data.verificationCodeLength)
  const digits = computed(() => auth.user.value?.phone?.slice(-2) ?? '')
</script>

<template>
  <Form @submit="submit">
    <p class="text-center">
      {{ $t(`features.form.auth_verify_account.note_${channel}`, { digits }) }}
    </p>

    <div class="flex justify-center">
      <InputOTP
        v-model="code"
        :maxlength="length"
      >
        <InputOTPGroup
            v-for="i in length"
            :key="i"
        >
          <InputOTPSlot :index="i - 1" />
        </InputOTPGroup>
      </InputOTP>
    </div>

    <p
      v-if="error"
      class="text-center text-sm text-destructive"
    >
      {{ error }}
    </p>

    <FormButton
      class="w-full"
      :pending="isPending"
    >
      {{ $t('features.lbl.verify') }}
    </FormButton>

    <p class="self-end text-sm text-muted-foreground">
      <ButtonLoading
        class="h-auto p-0 text-link"
        :pending="isResending"
        variant="link"
        @click="resend()"
      >
        {{ $t('features.form.auth_verify_account.resend_code') }}
      </ButtonLoading>

      |

      <Button
        class="h-auto p-0 text-link"
        variant="link"
        @click="onLogout"
      >
        {{ $t('features.lbl.sign_out') }}
      </Button>
    </p>
  </Form>
</template>
