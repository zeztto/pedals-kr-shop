'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { getReviews } from '@/lib/review-service';

export default function ArtistReviews() {
  const t = useTranslations('reviews');
  const locale = useLocale();
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

      <motion.div
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 max-w-6xl mx-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="min-w-[300px] md:min-w-[350px] snap-center flex-shrink-0 bg-bg-primary border border-amber/20 rounded-lg p-6"
          >
            {/* Avatar + name + role */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-amber/20">
                <Image
                  src={review.avatar}
                  alt={review.name[locale as 'ko' | 'en']}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="text-cream font-semibold text-base">
                  {review.name[locale as 'ko' | 'en']}
                </p>
                <p className="text-cream/50 text-sm">
                  {review.role[locale as 'ko' | 'en']}
                </p>
              </div>
            </div>

            {/* Comment */}
            <div className="relative">
              <span className="absolute -top-2 -left-1 text-amber/30 text-4xl font-heading leading-none select-none">
                &ldquo;
              </span>
              <p className="text-cream/80 italic text-sm leading-relaxed pl-5 pt-1">
                {review.comment[locale as 'ko' | 'en']}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
