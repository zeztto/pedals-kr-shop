import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { getProducts, getCategories } from '@/lib/product-service';
import type { Category } from '@/lib/types';
import CategoryFilter from '@/components/shop/CategoryFilter';
import ProductGrid from '@/components/shop/ProductGrid';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Shop | PEDALS',
    description:
      'Browse our collection of handcrafted guitar pedals. Distortion, fuzz, chorus, reverb, delay, and overdrive — each built with care in Korea.',
  };
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;

  const validCategories = getCategories();
  const activeCategory =
    category && validCategories.includes(category as Category)
      ? (category as Category)
      : undefined;

  const products = getProducts(activeCategory);
  const t = await getTranslations({ locale, namespace: 'shop' });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-heading font-bold text-amber mb-8 text-center pt-8">
        {t('title')}
      </h1>
      <Suspense fallback={null}>
        <CategoryFilter />
      </Suspense>
      <ProductGrid products={products} locale={locale} />
    </div>
  );
}
