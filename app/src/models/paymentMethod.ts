export interface PaymentMethodIntentDto {
  client_secret: string
}

export interface PaymentMethodIntent {
  clientSecret: string
}

export function toPaymentMethodIntent(dto: PaymentMethodIntentDto): PaymentMethodIntent {
  return {
    clientSecret: dto.client_secret,
  }
}
