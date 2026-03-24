'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getFeaturedProducts } from '@/lib/product-service';
import { formatPrice } from '@/lib/format';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function ProductHighlights() {
  const t = useTranslations('shop');
  const locale = useLocale();
  const products = getFeaturedProducts();

  return (
    <section className="py-24 px-6">
      <motion.h2
        className="text-3xl md:text-4xl font-heading font-bold text-amber mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('featured')}
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/shop/${product.slug}`} className="block group">
              <div className="bg-bg-dark border border-brown/30 rounded-lg overflow-hidden group-hover:border-amber/50 transition-colors duration-300">
                {/* Product image */}
                <div className="aspect-square relative bg-bg-dark">
                  <Image
                    src={product.images[0]}
                    alt={product.name[locale as 'ko' | 'en']}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Product info */}
                <div className="p-4 space-y-2">
                  <p className="text-cream font-semibold text-base leading-tight">
                    {product.name[locale as 'ko' | 'en']}
                  </p>
                  <p className="text-amber font-heading font-bold text-lg">
                    {formatPrice(product.price, locale)}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge label={t(`categories.${product.category}`)} variant="category" />
                    {!product.inStock && (
                      <Badge label={t('outOfStock')} variant="outOfStock" />
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All button */}
      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button href="/shop" variant="secondary">
          {t('viewAll')}
        </Button>
      </motion.div>
    </section>
  );
}
