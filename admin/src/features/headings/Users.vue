<script setup lang="ts">
  import { ref } from 'vue'
  import { CalendarIcon, ClockIcon, MailIcon, UserIcon } from '@lucide/vue'
  import { usePagination } from '@shared/composables/support/usePagination'
  import { Heading, HeadingSort } from '@shared/components/common/Heading'
  import { Search } from '@shared/components/common/Search'

  const { search } = usePagination()

  const sortBy = ref('created_at')
  const sortDir = ref('desc')

  const sortFields = [
    { value: 'name', label: 'Name', icon: UserIcon },
    { value: 'created_at', label: 'Created', icon: CalendarIcon },
    { value: 'last_active_at', label: 'Last Active', icon: ClockIcon },
    { value: 'email', label: 'Email', icon: MailIcon },
  ]
</script>

<template>
  <Heading
    class="flex items-center justify-between gap-2"
    :margin="false"
  >
    {{ $t('features.heading.users') }}

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
