'use client';

import Image from 'next/image';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/lib/types';

interface CartItemProps {
  item: { productId: string; quantity: number };
  product: Product;
  locale: string;
}

export default function CartItem({ item, product, locale }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const localeKey = locale as 'ko' | 'en';

  return (
    <div className="bg-bg-dark border-b border-brown/20 p-4 flex items-center gap-4">
      {/* Product image */}
      <div className="relative w-20 h-20 shrink-0 rounded overflow-hidden bg-bg-dark">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name[localeKey]}
            fill
            className="object-contain"
          />
        )}
      </div>

      {/* Product info */}
      <div className="flex-1 min-w-0">
        <p className="text-cream font-semibold truncate">{product.name[localeKey]}</p>
        <p className="text-amber text-sm mt-1">{formatPrice(product.price, locale)}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          className="w-7 h-7 rounded-full border border-amber text-amber flex items-center justify-center hover:bg-amber hover:text-bg-dark transition-colors text-sm font-bold"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-6 text-center text-cream font-semibold">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          className="w-7 h-7 rounded-full border border-amber text-amber flex items-center justify-center hover:bg-amber hover:text-bg-dark transition-colors text-sm font-bold"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Line total */}
      <p className="text-cream font-semibold w-28 text-right shrink-0">
        {formatPrice(product.price * item.quantity, locale)}
      </p>

      {/* Remove button */}
      <button
        onClick={() => removeItem(item.productId)}
        className="text-vintage-red hover:opacity-70 transition-opacity shrink-0 ml-2"
        aria-label="Remove item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
