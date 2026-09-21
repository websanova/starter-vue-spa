<script setup lang="ts">
  import { useDateTime } from '@shared/composables/support/useDateTime'
  import { DataTable, DataTableRow } from '@shared/components/common/DataTable'
  import { Stack } from '@shared/components/common/Stack'
  import type { User } from '@/models/user'

  defineProps<{
    user: User
  }>()

  const formatDate = useDateTime()
</script>

<template>
  <Stack>
    <DataTable :title="$t('features.table.user.sections.profile')">
      <DataTableRow :label="$t('features.table.user.fields.first_name')">
        {{ user.firstName }}
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.last_name')">
        {{ user.lastName }}
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.email')">
        {{ user.email }}
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.phone')">
        <template v-if="user.phone">
          {{ user.phone }}
        </template>

        <span
          v-else
          class="text-muted-foreground"
        >-</span>
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.locale')">
        {{ user.locale }}
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.timezone')">
        {{ user.timezone }}
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.role')">
        <template v-if="user.role">
          {{ user.role }}
        </template>

        <span
          v-else
          class="text-muted-foreground"
        >-</span>
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.avatar_url')">
        <a
          v-if="user.avatarUrl"
          class="text-link"
          :href="user.avatarUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t('features.lbl.link') }}
        </a>

        <span
          v-else
          class="text-muted-foreground"
        >-</span>
      </DataTableRow>
    </DataTable>

    <DataTable :title="$t('features.table.user.sections.verification')">
      <DataTableRow :label="$t('features.table.user.fields.email_verified_at')">
        <template v-if="user.emailVerifiedAt">
          {{ formatDate(user.emailVerifiedAt, 'long') }}
        </template>

        <span
          v-else
          class="text-muted-foreground"
        >-</span>
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.phone_verified_at')">
        <template v-if="user.phoneVerifiedAt">
          {{ formatDate(user.phoneVerifiedAt, 'long') }}
        </template>

        <span
          v-else
          class="text-muted-foreground"
        >-</span>
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.is_password_reset_required')">
        {{ user.isPasswordResetRequired ? $t('features.lbl.yes') : $t('features.lbl.no') }}
      </DataTableRow>
    </DataTable>

    <DataTable :title="$t('features.table.user.sections.subscription')">
      <DataTableRow :label="$t('features.table.user.fields.plan')">
        {{ user.plan.name }}
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.is_subscribed')">
        {{ user.isSubscribed ? $t('features.lbl.yes') : $t('features.lbl.no') }}
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.is_on_trial')">
        {{ user.isOnTrial ? $t('features.lbl.yes') : $t('features.lbl.no') }}
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.trial_ends_at')">
        <template v-if="user.trialEndsAt">
          {{ formatDate(user.trialEndsAt, 'long') }}
        </template>

        <span
          v-else
          class="text-muted-foreground"
        >-</span>
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.is_on_grace_period')">
        {{ user.isOnGracePeriod ? $t('features.lbl.yes') : $t('features.lbl.no') }}
      </DataTableRow>
    </DataTable>

    <DataTable :title="$t('features.table.user.sections.activity')">
      <DataTableRow :label="$t('features.table.user.fields.created_at')">
        {{ formatDate(user.createdAt, 'long') }}
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.updated_at')">
        {{ formatDate(user.updatedAt, 'long') }}
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.last_active_at')">
        <template v-if="user.lastActiveAt">
          {{ formatDate(user.lastActiveAt, 'long') }}
        </template>

        <span
          v-else
          class="text-muted-foreground"
        >-</span>
      </DataTableRow>

      <DataTableRow :label="$t('features.table.user.fields.deleted_at')">
        <template v-if="user.deletedAt">
          {{ formatDate(user.deletedAt, 'long') }}
        </template>

        <span
          v-else
          class="text-muted-foreground"
        >-</span>
      </DataTableRow>
    </DataTable>
  </Stack>
</template>
