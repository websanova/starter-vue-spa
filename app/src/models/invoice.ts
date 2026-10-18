export interface InvoiceDto {
  amount: number
  currency: string
  date: string
  id: string
  number: string
  status: string
}

export interface Invoice {
  amount: number
  currency: string
  date: string
  id: string
  number: string
  status: string
}

export function toInvoice(dto: InvoiceDto): Invoice {
  return {
    amount: dto.amount,
    currency: dto.currency,
    date: dto.date,
    id: dto.id,
    number: dto.number,
    status: dto.status,
  }
}
