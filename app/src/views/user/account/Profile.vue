<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import ProfileAvatarForm from '@/features/forms/ProfileAvatar.vue'
  import ProfileInfoForm from '@/features/forms/ProfileInfo.vue'
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

      <ProfileInfoForm />
    </section>
  </Stack>
</template>
