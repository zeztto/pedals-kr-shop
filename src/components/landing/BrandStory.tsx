'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function BrandStory() {
  const t = useTranslations('brandStory');

  return (
    <motion.section
      className="py-24 px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-amber mb-12">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div className="space-y-6">
            <p className="text-cream/90 leading-relaxed text-lg">{t('paragraph1')}</p>
            <p className="text-cream/90 leading-relaxed text-lg">{t('paragraph2')}</p>
            <p className="text-cream/90 leading-relaxed text-lg">{t('paragraph3')}</p>
          </div>

          {/* Right: real image */}
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <Image
              src="/images/brand/workshop.jpg"
              alt="PEDALS workshop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
