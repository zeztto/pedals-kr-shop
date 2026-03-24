'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const tFooter = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-bg-dark border-t border-amber/20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-3">
            <span className="font-heading text-2xl font-bold text-amber tracking-widest">
              PEDALS
            </span>
            <p className="text-cream/60 text-sm leading-relaxed">
              {tFooter('tagline')}
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-cream text-xs uppercase tracking-widest font-semibold opacity-50 mb-1">
              {tFooter('links')}
            </h3>
            <Link
              href="/shop"
              className="text-cream/70 hover:text-amber transition-colors text-sm"
            >
              {tNav('shop')}
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/70 hover:text-amber transition-colors text-sm"
            >
              Instagram
            </a>
            <a
              href="mailto:hello@pedals.kr"
              className="text-cream/70 hover:text-amber transition-colors text-sm"
            >
              {tFooter('contact')}
            </a>
          </div>

          {/* Column 3: About */}
          <div className="flex flex-col gap-3">
            <p className="text-cream/60 text-sm leading-relaxed">
              {tFooter('madeIn')}
            </p>
            <p className="text-cream/30 text-xs mt-auto">
              © {new Date().getFullYear()} PEDALS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
