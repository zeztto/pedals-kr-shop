'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { getProductById } from '@/lib/product-service';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import type { Product } from '@/lib/types';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const t = useTranslations('cart');
  const params = useParams();
  const locale = (params?.locale as string) ?? 'ko';

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-heading font-bold text-amber mb-8">{t('title')}</h1>
      </div>
    );
  }

  const resolvedItems = items
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { item, product } : null;
    })
    .filter((entry): entry is { item: typeof items[number]; product: Product } => entry !== null);

  const total = resolvedItems.reduce(
    (sum, { item, product }) => sum + product.price * item.quantity,
    0
  );

  const isEmpty = resolvedItems.length === 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-heading font-bold text-amber mb-8">{t('title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items — 2 columns on desktop */}
        <div className="lg:col-span-2">
          {isEmpty ? (
            <p className="text-cream/50 py-8">{t('empty')}</p>
          ) : (
            <div className="rounded-lg overflow-hidden border border-brown/20">
              {resolvedItems.map(({ item, product }) => (
                <CartItem key={item.productId} item={item} product={product} locale={locale} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar summary — 1 column */}
        <div>
          <CartSummary total={total} locale={locale} isEmpty={isEmpty} />
        </div>
      </div>
    </div>
  );
}
