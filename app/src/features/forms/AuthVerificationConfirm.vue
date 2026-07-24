<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useLogout } from '@shared/composables/support/logout'
  import { useSettingsStore } from '@shared/stores/settings'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Form, FormButton } from '@shared/components/common/Form'
  import { InputOTP, InputOTPGroup, InputOTPSlot } from '@shared/components/ui/input-otp'

  const settings = useSettingsStore()
  const onLogout = useLogout()

  const length = computed(() => settings.data.verificationCodeLength)
  const code = ref('')
  const isResending = ref(false)

  function onResend() {}
</script>

<template>
  <Form>
    <div class="flex flex-col gap-4">
      <p class="text-center">
        {{ $t('features.form.verification_confirm.note') }}
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

      <FormButton class="w-full">
        {{ $t('features.lbl.verify') }}
      </FormButton>

      <p class="self-end text-sm text-muted-foreground">
        <ButtonLoading
          :pending="isResending"
          variant="link"
          class="h-auto p-0 text-link"
          @click="onResend"
        >
          {{ $t('features.form.verification_confirm.resend_code') }}
        </ButtonLoading>

        |

        <button
          type="button"
          class="text-link"
          @click="onLogout"
        >
          {{ $t('features.lbl.sign_out') }}
        </button>
      </p>
    </div>
  </Form>
</template>
