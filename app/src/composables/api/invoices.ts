import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toInvoice } from '@/models/invoice'
import { toPaginationMeta } from '@shared/models/pagination'
import type { InvoiceDto } from '@/models/invoice'
import type { PaginationMetaDto } from '@shared/models/pagination'
import type { Ref } from 'vue'

const key = ['invoices']

/**
 * Mints a temporary signed download URL for the invoice. The download
 * route itself sits outside the auth group, so the link has to be
 * requested here, where the ownership check runs, and then followed.
 */
export function useDownloadInvoice() {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await useHttp().post<{ data: { url: string } }>(`invoices/${id}/download`)
      return res.data.url
    },
  })
}

export function useInvoices(page: Ref<number>) {
  return useQuery({
    queryKey: [...key, page],
    queryFn: async () => {
      const { data, meta } = await useHttp().get<{ data: InvoiceDto[], meta: PaginationMetaDto }>('invoices', {
        params: {
          page: page.value,
        },
      })
      return {
        invoices: data.map(toInvoice),
        meta: toPaginationMeta(meta),
      }
    },
    placeholderData: keepPreviousData,
  })
}
