import { products } from '@/data/product-data';
import type { Category, Product } from './types';

export function getProducts(category?: Category): Product[] {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getCategories(): Category[] {
  return ['distortion', 'fuzz', 'chorus', 'reverb', 'delay', 'overdrive'];
}
