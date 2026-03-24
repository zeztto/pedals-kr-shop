import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/product-service';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pedals.kr';
  const locales = ['ko', 'en'];
  const products = getProducts();

  const staticPages = ['', '/shop'];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }

  // Product pages for each locale
  for (const locale of locales) {
    for (const product of products) {
      entries.push({
        url: `${baseUrl}/${locale}/shop/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
