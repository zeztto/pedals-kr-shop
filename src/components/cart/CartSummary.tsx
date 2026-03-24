'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { formatPrice } from '@/lib/format';
import Button from '@/components/ui/Button';

interface CartSummaryProps {
  total: number;
  locale: string;
  isEmpty: boolean;
}

export default function CartSummary({ total, locale, isEmpty }: CartSummaryProps) {
  const t = useTranslations('cart');

  return (
    <div className="bg-bg-dark rounded-lg p-6 border border-brown/30">
      {isEmpty ? (
        <div className="flex flex-col items-center gap-6 py-4">
          <p className="text-cream/70 text-center">{t('empty')}</p>
          <Button variant="secondary" href="/shop">
            {t('continueShopping')}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-cream/70 font-semibold uppercase tracking-wider text-sm">
              {t('total')}
            </span>
            <span className="text-amber text-xl font-heading font-bold">
              {formatPrice(total, locale)}
            </span>
          </div>
          <Button variant="primary" href="/checkout" className="w-full text-center">
            {t('checkout')}
          </Button>
        </div>
      )}
    </div>
  );
}
