'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { getReviews } from '@/lib/review-service';

export default function ArtistReviews() {
  const t = useTranslations('reviews');
  const locale = useLocale() as 'ko' | 'en';
  const reviews = getReviews();

  return (
    <section className="py-24 px-6 bg-bg-dark">
      <motion.h2
        className="text-3xl md:text-4xl font-heading font-bold text-amber mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('title')}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="bg-bg-primary border border-amber/20 rounded-lg overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Pedal image strip */}
            <div className="relative h-40 overflow-hidden">
              <Image
                src={review.pedalImage}
                alt=""
                fill
                className="object-cover opacity-50"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary" />
            </div>

            {/* Quote */}
            <div className="relative flex-1 px-8 pb-6 -mt-6">
              <span className="text-amber/20 text-5xl font-heading leading-none select-none">
                &ldquo;
              </span>
              <p className="text-cream/80 italic leading-relaxed text-[15px] -mt-3">
                {review.comment[locale]}
              </p>
            </div>

            {/* Avatar + name + role */}
            <div className="flex items-center gap-4 px-8 pb-6">
              <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border border-amber/30">
                <Image
                  src={review.avatar}
                  alt={review.name[locale]}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div>
                <p className="text-cream font-semibold text-sm">
                  {review.name[locale]}
                </p>
                <p className="text-amber/60 text-xs">
                  {review.role[locale]}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
