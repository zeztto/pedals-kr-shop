const formatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
});

export function formatPrice(price: number, locale: string = 'ko'): string {
  const formatted = formatter.format(price);
  return locale === 'en' ? `${formatted} KRW` : formatted;
}
