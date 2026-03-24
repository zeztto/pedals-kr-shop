'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

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

          {/* Right: image placeholder */}
          <div className="aspect-square bg-bg-dark border-2 border-amber/30 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
            {/* Faded large background text */}
            <span className="absolute text-[10rem] font-heading font-bold text-amber/5 select-none leading-none">
              PEDALS
            </span>
            {/* Decorative amber accent lines */}
            <div className="absolute top-6 left-6 w-12 h-0.5 bg-amber/40" />
            <div className="absolute top-6 left-6 h-12 w-0.5 bg-amber/40" />
            <div className="absolute bottom-6 right-6 w-12 h-0.5 bg-amber/40" />
            <div className="absolute bottom-6 right-6 h-12 w-0.5 bg-amber/40" />
            {/* Center label */}
            <div className="z-10 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full border-2 border-amber/50 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-amber/60" />
              </div>
              <span className="font-heading text-amber/50 tracking-widest text-sm uppercase mt-2">
                pedals.kr
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
