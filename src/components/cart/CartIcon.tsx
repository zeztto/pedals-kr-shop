'use client';

import { useState, useEffect } from 'react';

export default function CartIcon() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Cart store will be wired in Task 9; for now static 0
    setCount(0);
  }, []);

  const displayCount = mounted ? count : 0;

  return (
    <button
      aria-label="Cart"
      className="relative flex items-center justify-center p-2 text-cream hover:text-amber transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {displayCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber text-[10px] font-bold text-white leading-none">
          {displayCount}
        </span>
      )}
    </button>
  );
}
