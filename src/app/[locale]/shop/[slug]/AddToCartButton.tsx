'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart-store';
import Button from '@/components/ui/Button';

interface AddToCartButtonProps {
  productId: string;
  disabled: boolean;
  addText: string;
  addedText: string;
  outOfStockText: string;
}

export default function AddToCartButton({
  productId,
  disabled,
  addText,
  addedText,
  outOfStockText,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleClick = () => {
    addItem(productId);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Button
      variant="primary"
      onClick={handleClick}
      disabled={disabled}
      className="w-full mt-6"
    >
      {disabled ? outOfStockText : added ? addedText : addText}
    </Button>
  );
}
