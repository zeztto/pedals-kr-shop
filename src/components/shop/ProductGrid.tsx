import ProductCard from './ProductCard';
import type { Product } from '@/lib/types';

interface ProductGridProps {
  products: Product[];
  locale: string;
  emptyMessage?: string;
}

export default function ProductGrid({ products, locale, emptyMessage }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-cream text-lg">{emptyMessage || 'No products found.'}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} locale={locale} />
      ))}
    </div>
  );
}
