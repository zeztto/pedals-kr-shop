'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const stepNumbers = ['01', '02', '03', '04'];

export default function Craftsmanship() {
  const t = useTranslations('craftsmanship');

  const steps = stepNumbers.map((num, i) => ({
    number: num,
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            className="flex flex-col items-center text-center relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            {/* Connecting line on desktop (except last step) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-[-50%] border-t border-amber/20 z-0" />
            )}

            {/* Number circle */}
            <div className="w-12 h-12 rounded-full border-2 border-amber flex items-center justify-center text-amber font-heading text-xl font-bold relative z-10 bg-bg-dark">
              {step.number}
            </div>

            {/* Title */}
            <p className="text-cream font-semibold text-lg mt-4">{step.title}</p>

            {/* Description */}
            <p className="text-cream/60 text-sm mt-2">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
