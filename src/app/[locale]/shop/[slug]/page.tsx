import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getProductBySlug, getProducts } from '@/lib/product-service';
import { formatPrice } from '@/lib/format';
import Badge from '@/components/ui/Badge';
import ProductCard from '@/components/shop/ProductCard';
import AddToCartButton from './AddToCartButton';

export function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name[locale as 'ko' | 'en'],
    description: product.description[locale as 'ko' | 'en'],
    openGraph: {
      title: product.name[locale as 'ko' | 'en'],
      description: product.description[locale as 'ko' | 'en'],
      images: product.images,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'shop' });

  const allProducts = getProducts(product.category);
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[locale as 'ko' | 'en'],
    description: product.description[locale as 'ko' | 'en'],
    image: product.images[0],
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'KRW',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main product grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column: image */}
          <div className="relative aspect-square bg-bg-dark rounded-lg overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name[locale as 'ko' | 'en']}
              fill
              className="object-contain"
            />
          </div>

          {/* Right column: info */}
          <div>
            <Badge label={t(`categories.${product.category}`)} variant="category" />

            <h1 className="text-3xl md:text-4xl font-heading font-bold text-cream mt-2">
              {product.name[locale as 'ko' | 'en']}
            </h1>

            <p className="text-2xl text-amber font-heading mt-4">
              {formatPrice(product.price, locale)}
            </p>

            <p className="text-cream/80 leading-relaxed mt-6 text-lg">
              {product.description[locale as 'ko' | 'en']}
            </p>

            {/* Specs table */}
            <dl className="mt-8">
              {product.specs.map((spec, i) => (
                <div key={i} className="border-b border-brown/20 py-3 flex gap-4">
                  <dt className="text-cream/50 w-32 shrink-0">{spec.label[locale as 'ko' | 'en']}</dt>
                  <dd className="text-cream">{spec.value[locale as 'ko' | 'en']}</dd>
                </div>
              ))}
            </dl>

            {/* Add to Cart */}
            <div className="mt-8">
              <AddToCartButton
                productId={product.id}
                disabled={!product.inStock}
                addText={t('addToCart')}
                addedText={t('added')}
                outOfStockText={t('outOfStock')}
              />
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-heading font-bold text-cream">
              {t('relatedProducts')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} locale={locale} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
