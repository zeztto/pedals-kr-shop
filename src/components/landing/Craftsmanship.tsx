'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const stepImages = [
  '/images/brand/craft-2.jpg',
  '/images/brand/craft-1.jpg',
  '/images/brand/craft-3.jpg',
  '/images/brand/craft-4.jpg',
];

export default function Craftsmanship() {
  const t = useTranslations('craftsmanship');

  const steps = [0, 1, 2, 3].map((i) => ({
    number: String(i + 1).padStart(2, '0'),
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
    image: stepImages[i],
  }));

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            className="bg-bg-primary rounded-lg overflow-hidden border border-brown/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
          >
            {/* Step image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover opacity-70"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
              <div className="absolute top-3 left-3 w-10 h-10 rounded-full border-2 border-amber flex items-center justify-center text-amber font-heading text-sm font-bold bg-bg-dark/80">
                {step.number}
              </div>
            </div>

            {/* Step content */}
            <div className="p-5">
              <p className="text-cream font-semibold text-base">{step.title}</p>
              <p className="text-cream/50 text-sm mt-2 leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
