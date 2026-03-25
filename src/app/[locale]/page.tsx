import Hero from '@/components/landing/Hero';
import BrandStory from '@/components/landing/BrandStory';
import Craftsmanship from '@/components/landing/Craftsmanship';
import ProductHighlights from '@/components/landing/ProductHighlights';
import ArtistReviews from '@/components/landing/ArtistReviews';
import CustomCTA from '@/components/landing/CustomCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStory />
      <Craftsmanship />
      <ProductHighlights />
      <ArtistReviews />
      <CustomCTA />
    </>
  );
}
