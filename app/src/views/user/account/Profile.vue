<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import ProfileAvatarForm from '@/features/forms/ProfileAvatar.vue'
  import ProfileEditForm from '@/features/forms/ProfileEdit.vue'
</script>

<template>
  <Stack>
    <section>
      <Heading>
        {{ $t('features.heading.profile_avatar') }}
      </Heading>

      <ProfileAvatarForm />
    </section>

    <section>
      <Heading>
        {{ $t('features.heading.profile_info') }}
      </Heading>

      <ProfileEditForm />
    </section>
  </Stack>
</template>
