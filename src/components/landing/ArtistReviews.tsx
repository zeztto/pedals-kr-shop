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
            className="bg-bg-primary border border-amber/20 rounded-lg p-8 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Quote */}
            <div className="relative flex-1 mb-6">
              <span className="absolute -top-1 -left-2 text-amber/20 text-6xl font-heading leading-none select-none">
                &ldquo;
              </span>
              <p className="text-cream/80 italic leading-relaxed pl-6 pt-3 text-[15px]">
                {review.comment[locale]}
              </p>
            </div>

            {/* Avatar + name + role */}
            <div className="flex items-center gap-4 pt-4 border-t border-amber/10">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-amber/30">
                <Image
                  src={review.avatar}
                  alt={review.name[locale]}
                  fill
                  className="object-cover"
                  sizes="48px"
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
