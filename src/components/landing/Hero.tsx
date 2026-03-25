'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/brand/hero-bg.jpg"
        alt=""
        fill
        className="object-cover opacity-20"
        priority
        sizes="100vw"
      />
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(13,13,13,0.4) 0%, rgba(13,13,13,0.85) 60%, rgba(13,13,13,0.95) 100%)',
        }}
      />

      <div className="relative z-[2] flex flex-col items-center">
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
      </div>
    </section>
  );
}
