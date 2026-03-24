# Pedals.kr - Landing Page & Online Shop Design Spec

## Overview

A landing page and online shop for "PEDALS" (페달스), a Korean boutique handmade guitar pedal effects brand targeting 70s-80s rock and heavy metal sound. The site features strong brand storytelling rooted in American & British sound heritage, crafted by a single artisan workshop in Korea with strictly selected components.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **i18n:** next-intl (route-based: `/ko`, `/en`)
- **State:** zustand (cart with localStorage persistence)
- **Animation:** framer-motion
- **Deployment:** Vercel + pedals.kr domain
- **Data:** Local JSON/TS files with abstracted data access layer

## Project Structure

```
src/
  app/
    [locale]/
      layout.tsx
      page.tsx                # Landing page
      shop/
        page.tsx              # Product listing
        [slug]/page.tsx       # Product detail
      cart/page.tsx            # Cart
      checkout/page.tsx        # Checkout (placeholder)
  components/
    layout/                   # Header, Footer, Navigation
    landing/                  # Hero, BrandStory, Craftsmanship, ProductHighlights, ArtistReviews
    shop/                     # ProductCard, ProductGrid, CategoryFilter
    cart/                     # CartItem, CartSummary
    checkout/                 # CheckoutForm, OrderSummary
    ui/                       # Button, Badge, etc.
  data/
    product-data.ts           # Raw product data
    review-data.ts            # Raw review data
  lib/
    product-service.ts        # Product data access layer (abstraction)
    review-service.ts         # Review data access layer (abstraction)
    cart-store.ts             # Zustand cart store
    types.ts                  # Shared TypeScript types
    payment.ts                # PaymentProvider interface
  messages/
    ko.json                   # Korean translations
    en.json                   # English translations
  middleware.ts               # next-intl locale detection & routing
```

## Visual Design

### Tone
70s-80s vintage rock poster aesthetic. Grain textures, bold serif + hand-drawn typography, warm amber tones against dark backgrounds. Analog, raw, authentic.

### Color Palette
- Background: Dark charcoal `#1a1a1a` to black `#0d0d0d`
- Primary: Amber/gold `#d4a017`
- Text: Cream `#f5f0e8`
- Accent: Vintage red `#8b2500`
- Secondary: Muted brown `#3d2b1f`

### Typography
- Headings: **Playfair Display** (bold serif, vintage feel) via `next/font/google`
- Body: **Inter** (clean sans-serif) via `next/font/google`

### Images & Assets
- Product images: `/public/images/products/` — placeholder SVGs (600x600) for initial launch
- Avatars: `/public/images/avatars/` — placeholder SVGs (200x200)
- Brand assets: `/public/images/brand/` — logo, textures, grain overlay
- All images use `next/image` for optimization

## Landing Page Sections

### 1. Hero
- Full-screen with grain texture overlay
- Large "PEDALS" typography
- Tagline: "Handcrafted in Korea. Rooted in American & British Sound."
- CTA button linking to Shop

### 2. Brand Story
- Why these pedals exist: reverence for 70s-80s American/British sound
- Artisan craftsmanship in a Korean workshop
- Strictly selected components
- 2-column layout: text + image/illustration

### 3. Craftsmanship (제작 과정)
- 3-4 step process: Component Selection → Hand Wiring → Testing → Completion
- Each step with icon/illustration and short description

### 4. Product Highlights
- 3-4 featured product cards from the catalog
- Hover animations
- "View All" button linking to Shop

### 5. Artist Reviews
- Testimonial cards in carousel format
- Name, photo, comment

### 6. Footer
- Brand logo, SNS links, contact info, copyright

## Shop & E-commerce

### Product Listing (`/shop`)
- Category filter: All, Distortion, Fuzz, Chorus, Reverb, Delay, Overdrive
- 2-3 column responsive grid
- Cards: product image, name, price, category badge

### Product Detail (`/shop/[slug]`)
- Large product image (array for future gallery)
- Name, price, category, full description
- Specs table (controls, power, size, weight)
- "Add to Cart" button
- Related products section

### Cart (`/cart`)
- List of added products with quantity controls and remove
- Subtotal/total display
- "Checkout" button
- State persisted via zustand + localStorage

### Checkout (`/checkout`)
- Shipping info form (name, address, phone)
- Order summary
- Payment area: "Payment system coming soon" with disabled button
- Internal `PaymentProvider` interface ready for future integration

## Data Models

```typescript
type Category = 'distortion' | 'fuzz' | 'chorus' | 'reverb' | 'delay' | 'overdrive';

interface LocalizedString {
  ko: string;
  en: string;
}

interface Product {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number; // KRW
  category: Category;
  images: string[];
  specs: Record<string, LocalizedString>;
  inStock: boolean;
  featured: boolean;
}

interface Review {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  comment: LocalizedString;
  avatar: string;
}

interface CartItem {
  productId: string;  // Reference by ID, resolve full product at render time
  quantity: number;
}

interface Order {
  items: CartItem[];
  shipping: ShippingInfo;
  total: number;
}

interface ShippingInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface PaymentSession {
  id: string;
  url: string;
}

interface PaymentResult {
  success: boolean;
  orderId: string;
}

interface PaymentProvider {
  createSession(order: Order): Promise<PaymentSession>;
  verifyPayment(sessionId: string): Promise<PaymentResult>;
}
```

## Data Access Layer

`lib/product-service.ts` exports:
- `getProducts(category?: Category): Product[]`
- `getProductBySlug(slug: string): Product | undefined`
- `getProductById(id: string): Product | undefined`
- `getFeaturedProducts(): Product[]`
- `getCategories(): Category[]`

`lib/review-service.ts` exports:
- `getReviews(): Review[]`

Currently reads from `data/product-data.ts` and `data/review-data.ts`. To migrate to CMS/DB, only these service files need to change.

## Price Formatting

- All prices stored in KRW (number)
- Both locales display KRW: Korean uses "₩289,000", English uses "₩289,000 KRW"
- Use `Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })` for formatting

## i18n Strategy

- **Library:** next-intl v4 with App Router plugin
- **Config:** `src/i18n/routing.ts` defines locales and default locale; `src/i18n/request.ts` provides server-side message loading
- **Middleware:** `src/middleware.ts` uses `createMiddleware` from next-intl for locale detection and routing
- Route-based: `/ko/...` and `/en/...`
- Default locale: `ko`
- Root `/` redirects based on browser language detection
- UI text in `messages/ko.json` and `messages/en.json`
- Product data uses inline `{ ko, en }` objects
- Language toggle (KO/EN) in header, preserves current page

## Responsive Design

- **Mobile** (<640px): Single column, hamburger menu, stacked layouts
- **Tablet** (640-1024px): 2-column grids, collapsible navigation
- **Desktop** (>1024px): Full layout with 3-column product grid, 2-column brand story
- Uses Tailwind breakpoints: `sm`, `md`, `lg`, `xl`

## SEO & Metadata

- `generateMetadata` on each page for title, description, Open Graph tags
- Product pages include JSON-LD structured data (`Product` schema)
- `robots.txt` and `sitemap.xml` generated via Next.js conventions
- Open Graph images for social sharing

## Out of Stock Behavior

- Out-of-stock products are still viewable on listing and detail pages
- "Add to Cart" button is disabled with "Out of Stock" label
- Category badge shows stock status

## Checkout Placeholder Flow

- User fills shipping form → clicks "Place Order" → shows confirmation message: "Thank you! Payment integration coming soon. We'll contact you via email."
- No data is persisted; this is purely UI for now

## Dummy Data

### Products (6 items)

| Name | Category | Price | Concept |
|------|----------|-------|---------|
| Hellfire | Distortion | ₩289,000 | 70s high-gain Marshall tone |
| Fuzz War | Fuzz | ₩259,000 | Big Muff-style vintage fuzz |
| Analog Chorus | Chorus | ₩249,000 | 80s CE-2 style analog chorus |
| Spring Tank | Reverb | ₩279,000 | Spring reverb emulation |
| Tape Echo | Delay | ₩299,000 | Tape echo sound |
| Doom Driver | Overdrive | ₩239,000 | Tube amp breakup overdrive |

Each product includes: bilingual name/description, specs (knobs, power, size, weight), stock status, images (placeholder).

### Reviews (3-4 items)
Dummy artist testimonials with bilingual content.

## Deployment

- Git repo initialized, committed, pushed
- Vercel project created and deployed
- `pedals.kr` domain connected via Vercel DNS settings

## Future Extensibility

- **Payment:** Implement `PaymentProvider` interface with Stripe/TossPayments
- **CMS:** Replace `lib/products.ts` data source with Sanity/Contentful
- **Database:** Add order persistence with Prisma + PostgreSQL
- **Auth:** Customer accounts for order tracking
- **Sound samples:** Audio player component for each product
