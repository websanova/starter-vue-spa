<script setup lang="ts">
  import { DownloadIcon } from '@lucide/vue'
  import { useDateTime } from '@shared/composables/support/useDateTime'
  import { Item } from '@shared/components/common/Item'
  import { Button } from '@shared/components/ui/button'
  import type { Invoice } from '@/models/invoice'

  defineProps<{
    invoice: Invoice
  }>()

  const emit = defineEmits<{
    download: []
  }>()

  const formatDate = useDateTime()
</script>

<template>
  <Item>
    <template #title>
      {{ formatDate(invoice.date) }}
    </template>

    <template #actions>
      <Button
        size="icon"
        variant="ghost"
        :aria-label="$t('features.sr.download_invoice')"
        @click="emit('download')"
      >
        <DownloadIcon />
      </Button>
    </template>
  </Item>
</template>
