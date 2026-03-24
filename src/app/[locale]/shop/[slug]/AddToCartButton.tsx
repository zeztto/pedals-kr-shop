'use client';

import Button from '@/components/ui/Button';

interface AddToCartButtonProps {
  productId: string;
  inStock: boolean;
  addToCartText: string;
  outOfStockText: string;
}

export default function AddToCartButton({
  inStock,
  addToCartText,
  outOfStockText,
}: AddToCartButtonProps) {
  return (
    <Button
      variant="primary"
      disabled={!inStock}
      onClick={() => {
        // Will be wired to cart store in Task 9
      }}
    >
      {inStock ? addToCartText : outOfStockText}
    </Button>
  );
}
