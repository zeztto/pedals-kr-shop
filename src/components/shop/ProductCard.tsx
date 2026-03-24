'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import Badge from '@/components/ui/Badge';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/lib/types';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
  product: Product;
  locale: string;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const t = useTranslations('shop');

  return (
    <Link href={`/shop/${product.slug}`}>
      <div className="group bg-bg-dark border border-brown/30 rounded-lg overflow-hidden hover:border-amber/50 transition-all duration-300">
        <div className="relative aspect-square bg-bg-primary overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name[locale as 'ko' | 'en'] ?? product.name.en}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge label={t('outOfStock')} variant="outOfStock" />
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-cream font-semibold text-lg">
            {product.name[locale as 'ko' | 'en'] ?? product.name.en}
          </p>
          <p className="text-amber font-heading text-xl mt-1">
            {formatPrice(product.price, locale)}
          </p>
          <div className="mt-2">
            <Badge label={t(`categories.${product.category}`)} variant="category" />
          </div>
        </div>
      </div>
    </Link>
  );
}
