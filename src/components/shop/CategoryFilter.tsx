'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const CATEGORIES = ['distortion', 'fuzz', 'chorus', 'reverb', 'delay', 'overdrive'] as const;

export default function CategoryFilter() {
  const t = useTranslations('shop');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  function handleClick(category: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ''}`);
  }

  return (
    <div className="flex gap-3 flex-wrap justify-center mb-12">
      <button
        onClick={() => handleClick(null)}
        className={`px-4 py-2 rounded-full text-sm uppercase tracking-wide transition-colors ${
          !activeCategory
            ? 'bg-amber text-bg-dark font-semibold'
            : 'bg-bg-dark text-cream/70 hover:text-cream border border-brown/30 hover:border-amber/30'
        }`}
      >
        {t('filterAll')}
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-4 py-2 rounded-full text-sm uppercase tracking-wide transition-colors ${
            activeCategory === cat
              ? 'bg-amber text-bg-dark font-semibold'
              : 'bg-bg-dark text-cream/70 hover:text-cream border border-brown/30 hover:border-amber/30'
          }`}
        >
          {t(`categories.${cat}`)}
        </button>
      ))}
    </div>
  );
}
