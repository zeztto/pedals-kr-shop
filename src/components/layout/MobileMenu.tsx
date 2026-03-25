'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: Props) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 z-50 h-full w-3/4 max-w-xs bg-bg-dark flex flex-col shadow-xl"
          >
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex items-center justify-center w-10 h-10 text-cream hover:text-amber transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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

            {/* Nav links */}
            <nav className="flex flex-col gap-1 px-6 mt-4">
              <Link
                href="/"
                onClick={onClose}
                className="py-3 text-lg text-cream hover:text-amber transition-colors border-b border-brown/30"
              >
                {t('home')}
              </Link>
              <Link
                href="/shop"
                onClick={onClose}
                className="py-3 text-lg text-cream hover:text-amber transition-colors border-b border-brown/30"
              >
                {t('shop')}
              </Link>
              <Link
                href="/custom"
                onClick={onClose}
                className="py-3 text-lg text-cream hover:text-amber transition-colors border-b border-brown/30"
              >
                {t('custom')}
              </Link>
              <Link
                href="/cart"
                onClick={onClose}
                className="py-3 text-lg text-cream hover:text-amber transition-colors border-b border-brown/30"
              >
                {t('cart')}
              </Link>
            </nav>

            {/* Locale toggle */}
            <div className="px-6 mt-6">
              <div className="flex items-center gap-3 text-sm">
                <button
                  onClick={() => switchLocale('ko')}
                  className={`px-3 py-1.5 rounded transition-colors ${
                    locale === 'ko'
                      ? 'text-amber font-semibold border border-amber/40'
                      : 'text-cream/50 hover:text-cream border border-transparent'
                  }`}
                >
                  한국어
                </button>
                <button
                  onClick={() => switchLocale('en')}
                  className={`px-3 py-1.5 rounded transition-colors ${
                    locale === 'en'
                      ? 'text-amber font-semibold border border-amber/40'
                      : 'text-cream/50 hover:text-cream border border-transparent'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
