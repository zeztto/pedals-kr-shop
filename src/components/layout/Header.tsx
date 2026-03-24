'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';
import CartIcon from '@/components/cart/CartIcon';
import MobileMenu from '@/components/layout/MobileMenu';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function switchLocale(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-bg-dark/90 backdrop-blur-sm border-b border-brown/30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-xl font-bold text-amber tracking-widest hover:opacity-80 transition-opacity"
          >
            PEDALS
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/shop"
              className="text-cream hover:text-amber transition-colors text-sm tracking-wide"
            >
              {t('shop')}
            </Link>

            {/* Locale toggle */}
            <div className="flex items-center gap-1 text-sm">
              <button
                onClick={() => switchLocale('ko')}
                className={`px-1 transition-colors ${
                  locale === 'ko' ? 'text-amber font-semibold' : 'text-cream/50 hover:text-cream'
                }`}
              >
                KO
              </button>
              <span className="text-cream/30">|</span>
              <button
                onClick={() => switchLocale('en')}
                className={`px-1 transition-colors ${
                  locale === 'en' ? 'text-amber font-semibold' : 'text-cream/50 hover:text-cream'
                }`}
              >
                EN
              </button>
            </div>

            <CartIcon />
          </nav>

          {/* Mobile right side */}
          <div className="flex md:hidden items-center gap-2">
            <CartIcon />
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 text-cream hover:text-amber transition-colors"
            >
              <span className="block w-5 h-0.5 bg-current rounded" />
              <span className="block w-5 h-0.5 bg-current rounded" />
              <span className="block w-5 h-0.5 bg-current rounded" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
