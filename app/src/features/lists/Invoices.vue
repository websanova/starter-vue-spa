<script setup lang="ts">
  import { useDownloadInvoice, useInvoices } from '@/composables/api/invoices'
  import { useQueryParam } from '@shared/composables/support/useQueryParam'
  import InvoiceItem from '@/components/items/Invoice.vue'
  import { LoadPaginate } from '@shared/components/common/LoadPaginate'
  import { ItemGroup } from '@shared/components/ui/item'

  const page = useQueryParam('page', { default: 1 })

  const { data, isPending, error } = useInvoices(page)

  const { mutate: download } = useDownloadInvoice()

  // The signed URL answers with an attachment, so the page stays put.
  function onDownload(id: string) {
    download(id, {
      onSuccess: (url) => {
        window.location.href = url
      },
    })
  }
</script>

<template>
  <div>
    <LoadPaginate
      v-model:page="page"
      i18n-key="features.load.nouns.invoices"
      :error="error"
      :is-pending="isPending"
      :meta="data?.meta"
    >
      <ItemGroup>
        <InvoiceItem
          v-for="invoice in data?.invoices"
          :key="invoice.id"
          :invoice="invoice"
          @download="onDownload(invoice.id)"
        />
      </ItemGroup>
    </LoadPaginate>
  </div>
</template>
