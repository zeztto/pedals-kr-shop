import type { Order, PaymentProvider, PaymentSession, PaymentResult } from './types';

export function createPaymentProvider(): PaymentProvider {
  throw new Error('Payment not configured. Implement a PaymentProvider to enable payments.');
}
