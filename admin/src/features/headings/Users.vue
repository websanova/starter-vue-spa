<script setup lang="ts">
  import { computed } from 'vue'
  import { CalendarIcon, ClockIcon, MailIcon, UserIcon } from '@lucide/vue'
  import { useUserParams } from '@/composables/params/users'
  import { useI18n } from '@shared/plugins/i18n'
  import { Heading, HeadingSort } from '@shared/components/common/Heading'
  import { Search } from '@shared/components/common/Search'

  const { search, sortBy, sortDir } = useUserParams()
  const i18n = useI18n()

  const sortFields = computed(() => [
    { value: 'name', label: i18n.t('features.heading.sort.name'), icon: UserIcon },
    { value: 'created_at', label: i18n.t('features.heading.sort.created_at'), icon: CalendarIcon },
    { value: 'last_active_at', label: i18n.t('features.heading.sort.last_active_at'), icon: ClockIcon },
    { value: 'email', label: i18n.t('features.heading.sort.email'), icon: MailIcon },
  ])
</script>

<template>
  <Heading
    class="flex items-center justify-between gap-2"
    :margin="false"
  >
    {{ $t('features.heading.title.users') }}

    <div class="flex items-center gap-2">
      <Search
        v-model="search"
        :placeholder="$t('features.ph.search')"
      />

      <HeadingSort
        v-model:sort-by="sortBy"
        v-model:sort-dir="sortDir"
        :fields="sortFields"
      />
    </div>
  </Heading>
</template>
