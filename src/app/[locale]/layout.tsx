import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GrainOverlay from '@/components/ui/GrainOverlay';

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ko'
      ? 'PEDALS — 핸드크래프트 기타 페달'
      : 'PEDALS — Handcrafted Guitar Pedals';
  const description =
    locale === 'ko'
      ? '한국에서 수제로 제작하는 부띠끄 기타 이펙터 페달. 70~80년대 미국과 영국 사운드에 뿌리를 둔 디스토션, 퍼즈, 코러스, 리버브, 딜레이.'
      : 'Boutique handcrafted guitar effect pedals made in Korea. Distortion, fuzz, chorus, reverb, delay rooted in 70s-80s American and British sound.';

  return {
    title: {
      default: title,
      template: `%s | PEDALS`,
    },
    description,
    openGraph: {
      siteName: 'PEDALS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
      images: [{ url: '/images/brand/og-image.svg', width: 1200, height: 630 }],
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-cream font-body">
        <NextIntlClientProvider messages={messages}>
          <GrainOverlay />
          <Header />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
