<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { usePasswordResetUpdateForm } from '@shared/composables/forms/passwordResetUpdate'
  import { Form, FormButton, FormInputText } from '@shared/components/common/Form'

  const route = useRoute()
  const submitted = ref(false)

  const isValidLink = computed(() => Boolean(route.query.email && route.query.token))

  const { submit, isPending } = usePasswordResetUpdateForm({
    email: route.query.email as string,
    token: route.query.token as string,
    onSuccess: () => { submitted.value = true },
  })
</script>

<template>
  <p
    v-if="!isValidLink"
    class="text-sm text-muted-foreground text-center"
  >
    {{ $t('features.form.password_reset_update.invalid') }}
  </p>

  <div
    v-else-if="submitted"
    class="flex flex-col gap-2 text-center"
  >
    <p class="font-medium">
      {{ $t('features.form.password_reset_update.done.heading') }}
    </p>

    <i18n-t
      keypath="features.form.password_reset_update.done.message"
      tag="p"
      class="text-sm text-muted-foreground"
    >
      <template #action>
        <RouterLink
          :to="{ name: 'auth-login' }"
          class="text-link"
        >
          {{ $t('features.lbl.sign_in') }}
        </RouterLink>
      </template>
    </i18n-t>
  </div>

  <Form
    v-else
    @submit="submit"
  >
    <FormInputText
      name="password"
      type="password"
      :label="$t('features.lbl.password')"
      :placeholder="$t('features.ph.password')"
    />

    <FormInputText
      name="password_confirmation"
      type="password"
      :label="$t('features.lbl.password_confirmation')"
      :placeholder="$t('features.ph.password_confirmation')"
    />

    <FormButton
      class="w-full"
      :pending="isPending"
    >
      {{ $t('features.lbl.update_password') }}
    </FormButton>
  </Form>
</template>
