'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCartStore } from '@/lib/cart-store';
import Button from '@/components/ui/Button';

const inputClass =
  'w-full bg-bg-primary border border-brown/30 rounded-lg px-4 py-3 text-cream focus:border-amber focus:outline-none transition-colors';
const labelClass = 'text-cream/70 text-sm mb-1 block';

interface Props {
  locale: string;
}

export default function CheckoutForm({ locale }: Props) {
  const t = useTranslations('checkout');
  const clearCart = useCartStore((s) => s.clearCart);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearCart();
    setSubmitted(true);
  }

  if (submitted) {
    const thankYouLabel = locale === 'ko' ? '감사합니다!' : 'Thank you!';
    const continueLinkLabel = locale === 'ko' ? '쇼핑 계속하기' : 'Continue Shopping';

    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-6">
        <p className="text-amber text-2xl font-heading font-bold">{thankYouLabel}</p>
        <p className="text-cream/80 text-base max-w-sm">{t('thankYou')}</p>
        <Button href="/shop" variant="secondary">
          {continueLinkLabel}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className={labelClass}>{t('name')}</label>
        <input type="text" required className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>{t('email')}</label>
        <input type="email" required className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>{t('phone')}</label>
        <input type="tel" required className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>{t('address')}</label>
        <textarea required rows={4} className={`${inputClass} resize-none`} />
      </div>

      <Button type="submit" className="w-full text-center justify-center">
        {t('placeOrder')}
      </Button>
    </form>
  );
}
