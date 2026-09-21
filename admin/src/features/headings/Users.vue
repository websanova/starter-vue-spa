<script setup lang="ts">
  import { ref } from 'vue'
  import { ArrowDownWideNarrowIcon, ArrowUpNarrowWideIcon, CalendarIcon, ClockIcon, ListFilterIcon, MailIcon, UserIcon } from '@lucide/vue'
  import { usePagination } from '@shared/composables/support/usePagination'
  import { Heading } from '@shared/components/common/Heading'
  import { Search } from '@shared/components/common/Search'
  import { Button } from '@shared/components/ui/button'
  import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@shared/components/ui/dropdown-menu'

  const { search } = usePagination()

  const sortBy = ref('created_at')
  const sortDir = ref('desc')
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

      <DropdownMenu :modal="false">
        <DropdownMenuTrigger as-child>
          <Button
            size="icon"
            variant="outline"
          >
            <ListFilterIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup v-model="sortBy">
            <DropdownMenuRadioItem value="name">
              <UserIcon />
              Name
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="created_at">
              <CalendarIcon />
              Created
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="last_active_at">
              <ClockIcon />
              Last Active
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="email">
              <MailIcon />
              Email
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>

          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup v-model="sortDir">
            <DropdownMenuRadioItem value="asc">
              <ArrowUpNarrowWideIcon />
              Ascending
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="desc">
              <ArrowDownWideNarrowIcon />
              Descending
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </Heading>
</template>
