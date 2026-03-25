'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Button from '@/components/ui/Button';

export default function CustomPage() {
  const t = useTranslations('custom');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-heading font-bold text-amber mb-6">
          {locale === 'ko' ? '감사합니다' : 'Thank You'}
        </h1>
        <p className="text-cream/80 text-lg leading-relaxed mb-10">
          {t('thankYou')}
        </p>
        <Button href="/" variant="secondary">
          {locale === 'ko' ? '홈으로' : 'Back Home'}
        </Button>
      </div>
    );
  }

  const inputClass =
    'w-full bg-bg-dark border border-brown/30 rounded-lg px-4 py-3 text-cream focus:border-amber focus:outline-none transition-colors placeholder:text-cream/30';
  const labelClass = 'text-cream/70 text-sm mb-1.5 block';

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-amber mb-3 pt-8">
        {t('pageTitle')}
      </h1>
      <p className="text-cream/60 mb-10 text-lg">
        {t('pageDescription')}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>{t('name')} *</label>
            <input type="text" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t('email')} *</label>
            <input type="email" required className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t('phone')}</label>
          <input type="tel" className={inputClass} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>{t('pedalType')} *</label>
            <input
              type="text"
              required
              placeholder={t('pedalTypePlaceholder')}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t('referencePedal')}</label>
            <input
              type="text"
              placeholder={t('referencePedalPlaceholder')}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t('details')} *</label>
          <textarea
            required
            rows={5}
            placeholder={t('detailsPlaceholder')}
            className={inputClass + ' resize-none'}
          />
        </div>

        <div>
          <label className={labelClass}>{t('budget')}</label>
          <input
            type="text"
            placeholder={t('budgetPlaceholder')}
            className={inputClass}
          />
        </div>

        <Button type="submit" variant="primary">
          {t('submit')}
        </Button>
      </form>
    </div>
  );
}
