'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{
        background:
          'radial-gradient(ellipse at center, #1a1a1a 0%, #0d0d0d 60%, #0d0d0d 100%)',
      }}
    >
      <motion.h1
        className="text-7xl md:text-8xl lg:text-9xl font-heading font-bold text-amber tracking-widest"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0 }}
      >
        PEDALS
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-cream/80 font-heading mt-6 max-w-xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
      >
        {t('tagline').split('\n').map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-10"
      >
        <Button href="/shop" variant="primary">
          {t('cta')}
        </Button>
      </motion.div>
    </section>
  );
}
