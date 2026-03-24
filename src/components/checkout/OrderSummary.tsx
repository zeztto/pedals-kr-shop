'use client';

import { useTranslations } from 'next-intl';
import { getProductById } from '@/lib/product-service';
import { formatPrice } from '@/lib/format';

interface Props {
  items: { productId: string; quantity: number }[];
  locale: string;
}

export default function OrderSummary({ items, locale }: Props) {
  const t = useTranslations('cart');

  const resolvedItems = items
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { item, product } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const total = resolvedItems.reduce(
    (sum, { item, product }) => sum + product.price * item.quantity,
    0
  );

  const title = locale === 'ko' ? '주문 요약' : 'Order Summary';

  return (
    <div className="bg-bg-dark rounded-lg p-6 border border-brown/30">
      <h2 className="text-xl font-heading font-semibold text-cream mb-4">{title}</h2>

      <div>
        {resolvedItems.map(({ item, product }) => (
          <div
            key={item.productId}
            className="flex justify-between py-2 border-b border-brown/20 text-cream/80"
          >
            <span>
              {product.name[locale as 'ko' | 'en'] ?? product.name.ko} × {item.quantity}
            </span>
            <span>{formatPrice(product.price * item.quantity, locale)}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4 text-lg font-semibold text-cream">
        <span>{t('total')}</span>
        <span>{formatPrice(total, locale)}</span>
      </div>
    </div>
  );
}
