'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

export default function CustomCTA() {
  const t = useTranslations('custom');

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber/5 via-transparent to-amber/5" />
      <motion.div
        className="max-w-3xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-amber mb-6">
          {t('title')}
        </h2>
        <p className="text-cream/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          {t('description')}
        </p>
        <Button href="/custom" variant="primary">
          {t('cta')}
        </Button>
      </motion.div>
    </section>
  );
}
