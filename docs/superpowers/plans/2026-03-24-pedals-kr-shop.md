# Pedals.kr Shop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (KO/EN) landing page and online shop for PEDALS, a Korean boutique handmade guitar pedal effects brand, with a vintage 70s-80s rock aesthetic.

**Architecture:** Next.js 15 App Router with route-based i18n via next-intl. Product data abstracted behind a service layer (JSON now, CMS/DB later). Cart state via zustand with localStorage persistence. Payment interface defined but not implemented.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, next-intl, zustand, framer-motion, Vercel

**Spec:** `docs/superpowers/specs/2026-03-24-pedals-kr-shop-design.md`

---

## File Structure

```
src/
  app/
    layout.tsx                 # Minimal root layout (html/body tags only)
    [locale]/
      layout.tsx              # Locale layout with fonts, metadata, Header/Footer
      page.tsx                 # Landing page
      shop/
        page.tsx               # Product listing
        [slug]/page.tsx        # Product detail
      cart/page.tsx             # Cart page
      checkout/page.tsx         # Checkout placeholder
    globals.css                # Tailwind imports + custom theme
  components/
    layout/
      Header.tsx               # Nav + logo + locale toggle + cart icon
      Footer.tsx               # Brand info, SNS, copyright
      MobileMenu.tsx           # Hamburger mobile navigation
    landing/
      Hero.tsx                 # Full-screen hero with grain texture
      BrandStory.tsx           # 2-column brand narrative
      Craftsmanship.tsx        # 4-step process showcase
      ProductHighlights.tsx    # Featured product cards
      ArtistReviews.tsx        # Testimonial carousel
    shop/
      ProductCard.tsx          # Product card for grid
      ProductGrid.tsx          # Responsive product grid
      CategoryFilter.tsx       # Category filter bar
    cart/
      CartItem.tsx             # Single cart item row
      CartSummary.tsx          # Totals + checkout button
      CartIcon.tsx             # Header cart icon with badge
    checkout/
      CheckoutForm.tsx         # Shipping info form
      OrderSummary.tsx         # Order review
    ui/
      Button.tsx               # Reusable button
      Badge.tsx                # Category/status badge
      GrainOverlay.tsx         # Grain texture overlay
  data/
    product-data.ts            # Raw product array
    review-data.ts             # Raw review array
  lib/
    types.ts                   # All shared TypeScript types
    product-service.ts         # Product data access layer
    review-service.ts          # Review data access layer
    cart-store.ts              # Zustand cart store
    payment.ts                 # PaymentProvider interface
    format.ts                  # Price formatting utility
  i18n/
    routing.ts                 # next-intl routing config
    request.ts                 # Server-side message loading
  messages/
    ko.json                    # Korean UI translations
    en.json                    # English UI translations
  middleware.ts                # next-intl locale middleware
public/
  images/
    products/                  # Product placeholder SVGs
    avatars/                   # Review avatar placeholders
    brand/                     # Logo, grain texture
next.config.ts                 # Next.js config with next-intl plugin
postcss.config.mjs             # PostCSS with @tailwindcss/postcss
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `src/app/globals.css`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd /Users/sungwoonjeon/dev/pedals.kr-shop
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

- [ ] **Step 2: Install dependencies**

```bash
npm install next-intl zustand framer-motion
npm install -D @types/node
```

- [ ] **Step 3: Configure Tailwind v4 custom theme in globals.css**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #1a1a1a;
  --color-bg-dark: #0d0d0d;
  --color-amber: #d4a017;
  --color-cream: #f5f0e8;
  --color-vintage-red: #8b2500;
  --color-brown: #3d2b1f;
  --font-heading: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;
}
```

- [ ] **Step 4: Configure next.config.ts with next-intl plugin**

```ts
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {};

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on localhost:3000 without errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 project with Tailwind v4, next-intl, zustand, framer-motion"
```

---

## Task 2: i18n Configuration

**Files:**
- Create: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/middleware.ts`, `src/messages/ko.json`, `src/messages/en.json`

- [ ] **Step 1: Create i18n routing config**

Create `src/i18n/routing.ts`:

```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
});
```

- [ ] **Step 2: Create i18n request config**

Create `src/i18n/request.ts`:

```ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create middleware**

Create `src/middleware.ts`:

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(ko|en)/:path*'],
};
```

- [ ] **Step 4: Create initial translation files**

Create `src/messages/ko.json` and `src/messages/en.json` with navigation, common UI labels, landing page text, shop text, cart text, and checkout text. Both files should have identical keys.

Key sections: `nav`, `hero`, `brandStory`, `craftsmanship`, `shop`, `cart`, `checkout`, `footer`, `common`

- [ ] **Step 5: Restructure app directory for locale routing**

Restructure the scaffolded app directory:
- Keep `src/app/layout.tsx` as a minimal root layout: only `<html>` and `<body>` tags, no lang attribute (that comes from locale layout). Import `globals.css` here.
- Move the default `src/app/page.tsx` into `src/app/[locale]/page.tsx`.
- Create `src/app/[locale]/layout.tsx` as the locale layout with `NextIntlClientProvider`, font loading (Playfair Display + Inter via `next/font/google`), and HTML lang attribute from params. This layout sets `<html lang={locale}>` and wraps children.

- [ ] **Step 6: Verify i18n routing works**

```bash
npm run dev
```

Visit `/ko` and `/en` — both should render without errors. Root `/` should redirect to `/ko`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: configure next-intl i18n with KO/EN routing and translations"
```

---

## Task 3: Types, Data Layer & Utilities

**Files:**
- Create: `src/lib/types.ts`, `src/data/product-data.ts`, `src/data/review-data.ts`, `src/lib/product-service.ts`, `src/lib/review-service.ts`, `src/lib/format.ts`, `src/lib/payment.ts`

- [ ] **Step 1: Define shared types**

Create `src/lib/types.ts` with all types from the spec: `Category`, `LocalizedString`, `Product`, `Review`, `CartItem` (with `productId`), `Order`, `ShippingInfo`, `PaymentSession`, `PaymentResult`, `PaymentProvider`.

- [ ] **Step 2: Create product dummy data**

Create `src/data/product-data.ts` with 6 products (Hellfire, Fuzz War, Analog Chorus, Spring Tank, Tape Echo, Doom Driver). Each product has bilingual name/description, specs (Controls, Power, Dimensions, Weight), category, price in KRW, slug, images array (placeholder paths), inStock, featured flags.

- [ ] **Step 3: Create review dummy data**

Create `src/data/review-data.ts` with 4 artist reviews. Each has bilingual name, role, comment, and avatar placeholder path.

- [ ] **Step 4: Create product service**

Create `src/lib/product-service.ts`:

```ts
import { products } from '@/data/product-data';
import type { Category, Product } from './types';

export function getProducts(category?: Category): Product[] {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getCategories(): Category[] {
  return ['distortion', 'fuzz', 'chorus', 'reverb', 'delay', 'overdrive'];
}
```

- [ ] **Step 5: Create review service**

Create `src/lib/review-service.ts`:

```ts
import { reviews } from '@/data/review-data';
import type { Review } from './types';

export function getReviews(): Review[] {
  return reviews;
}
```

- [ ] **Step 6: Create price formatting utility**

Create `src/lib/format.ts`:

```ts
const formatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
});

export function formatPrice(price: number, locale: string = 'ko'): string {
  const formatted = formatter.format(price);
  return locale === 'en' ? `${formatted} KRW` : formatted;
}
```

- [ ] **Step 7: Create payment interface**

Create `src/lib/payment.ts` with the `PaymentProvider` interface from types. Export a placeholder `createPaymentProvider` function that throws "Payment not configured".

- [ ] **Step 8: Create placeholder product SVGs**

Create 6 placeholder SVGs in `public/images/products/` (one per product slug, 600x600) and 4 avatar SVGs in `public/images/avatars/` (200x200). Each SVG should have the brand dark background with amber accent and the product/person name.

Also create `public/images/brand/grain.svg` — a subtle noise texture for the grain overlay.

Create `public/images/brand/og-image.png` — a 1200x630 Open Graph image placeholder with brand name and tagline on dark background with amber accent.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add types, product/review data, service layer, and placeholder assets"
```

---

## Task 4: Layout Components (Header + Footer)

**Files:**
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/MobileMenu.tsx`, `src/components/cart/CartIcon.tsx`, `src/components/ui/GrainOverlay.tsx`

- [ ] **Step 1: Create GrainOverlay component**

Create `src/components/ui/GrainOverlay.tsx` — a fixed-position full-screen div with the grain SVG as background, `pointer-events-none`, low opacity. Used across pages for the vintage texture.

- [ ] **Step 2: Create CartIcon component**

Create `src/components/cart/CartIcon.tsx` — shows a shopping bag/cart SVG icon with a small badge showing the number of items in cart. Uses the zustand cart store (to be wired later with a placeholder count of 0 for now).

- [ ] **Step 3: Create Header component**

Create `src/components/layout/Header.tsx`:
- Sticky top navigation, dark background with slight transparency
- Left: "PEDALS" logo text (Playfair Display, amber color), links to home
- Center/Right: Navigation links — Shop, Cart
- Language toggle: KO / EN buttons using `useRouter` and `usePathname` from next-intl
- Mobile: Hamburger button triggers MobileMenu
- CartIcon on the right

- [ ] **Step 4: Create MobileMenu component**

Create `src/components/layout/MobileMenu.tsx`:
- Slide-in drawer from the right (framer-motion)
- Same links as Header: Shop, Cart, Language toggle
- Close button (X)
- Dark overlay backdrop

- [ ] **Step 5: Create Footer component**

Create `src/components/layout/Footer.tsx`:
- Dark background, 3-column responsive layout
- Column 1: Brand name + short tagline
- Column 2: Links — Shop, Instagram (placeholder href), Contact (mailto placeholder)
- Column 3: "Made with passion in Korea" + copyright year
- Uses translations from `footer` namespace

- [ ] **Step 6: Wire layout into root layout**

Update `src/app/[locale]/layout.tsx` to include Header, Footer, and GrainOverlay wrapping `{children}`.

- [ ] **Step 7: Verify layout renders**

```bash
npm run dev
```

Visit `/ko` — Header with logo, nav links, locale toggle, and Footer should appear. Toggle to EN should work.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add Header, Footer, MobileMenu, and GrainOverlay layout components"
```

---

## Task 5: Landing Page — Hero + Brand Story

**Files:**
- Create: `src/components/landing/Hero.tsx`, `src/components/landing/BrandStory.tsx`, `src/components/ui/Button.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create Button component**

Create `src/components/ui/Button.tsx` — reusable button with variants (primary: amber bg, secondary: outlined). Accepts `href` for link behavior or `onClick` for actions. Vintage styling with slight uppercase tracking.

- [ ] **Step 2: Create Hero component**

Create `src/components/landing/Hero.tsx`:
- Full viewport height (`min-h-screen`), flexbox centered
- Large "PEDALS" in Playfair Display (very large: `text-7xl md:text-9xl`), amber color
- Tagline below in cream, smaller serif text
- Korean: "한국에서 수제로. 미국과 영국 사운드에 뿌리를 두고."
- English: "Handcrafted in Korea. Rooted in American & British Sound."
- CTA Button: "Shop Now" / "샵 바로가기" → links to `/shop`
- Fade-in animation on mount (framer-motion)
- Dark background with subtle radial gradient

- [ ] **Step 3: Create BrandStory component**

Create `src/components/landing/BrandStory.tsx`:
- Section with `py-24`, max-width container
- Section title: "Our Story" / "우리의 이야기"
- 2-column layout on desktop (text left, image right), stacked on mobile
- Text content from translations: why these pedals exist, reverence for 70s-80s sound, Korean craftsmanship, strict component selection
- Right column: placeholder image/illustration area (div with amber border, vintage styled)
- Fade-in on scroll (framer-motion `whileInView`)

- [ ] **Step 4: Wire into landing page**

Update `src/app/[locale]/page.tsx` to render Hero and BrandStory sections.

- [ ] **Step 5: Verify visually**

```bash
npm run dev
```

Visit `/ko` and `/en` — Hero with large PEDALS text, tagline, CTA button. Scroll to Brand Story section. Both languages should show correct content.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Hero and BrandStory landing sections with vintage styling"
```

---

## Task 6: Landing Page — Craftsmanship + Product Highlights + Reviews

**Files:**
- Create: `src/components/landing/Craftsmanship.tsx`, `src/components/landing/ProductHighlights.tsx`, `src/components/landing/ArtistReviews.tsx`, `src/components/ui/Badge.tsx`

- [ ] **Step 1: Create Craftsmanship component**

Create `src/components/landing/Craftsmanship.tsx`:
- Section title: "Craftsmanship" / "제작 과정"
- 4 steps in a horizontal row (desktop) / vertical stack (mobile):
  1. Component Selection / 부품 선별
  2. Hand Wiring / 핸드 와이어링
  3. Testing / 테스트
  4. Completion / 완성
- Each step: number circle (amber), title, short description
- Connected by a decorative line/dots between steps
- Staggered fade-in animation

- [ ] **Step 2: Create Badge component**

Create `src/components/ui/Badge.tsx` — small pill-shaped badge for categories and stock status. Props: `label`, `variant` (maps category to subtle color variations on the dark theme). Add a `stockStatus` variant that shows "Out of Stock" / "품절" in vintage red when `inStock` is false.

- [ ] **Step 3: Create ProductHighlights component**

Create `src/components/landing/ProductHighlights.tsx`:
- Section title: "Featured Pedals" / "추천 페달"
- Calls `getFeaturedProducts()` to get 3-4 featured products
- Cards in a responsive grid (1 col mobile, 2 tablet, 3-4 desktop)
- Each card: product image, name, price, category badge
- Hover effect: slight scale + shadow (framer-motion)
- "View All" / "전체 보기" button at bottom → links to `/shop`

- [ ] **Step 4: Create ArtistReviews component**

Create `src/components/landing/ArtistReviews.tsx`:
- Section title: "What Artists Say" / "아티스트 리뷰"
- Horizontal scroll / carousel of testimonial cards
- Each card: avatar image, name, role (e.g. "Session Guitarist"), quote text
- Styled with subtle amber border, cream text on dark card background
- Simple CSS scroll-snap carousel (no heavy library)

- [ ] **Step 5: Wire all sections into landing page**

Update `src/app/[locale]/page.tsx` to render all sections in order: Hero → BrandStory → Craftsmanship → ProductHighlights → ArtistReviews → (Footer is in layout)

- [ ] **Step 6: Verify complete landing page**

```bash
npm run dev
```

Visit `/ko` and `/en`. All 5 sections should render with correct content, animations, and responsive layout.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Craftsmanship, ProductHighlights, and ArtistReviews landing sections"
```

---

## Task 7: Shop — Product Listing Page

**Files:**
- Create: `src/components/shop/CategoryFilter.tsx`, `src/components/shop/ProductCard.tsx`, `src/components/shop/ProductGrid.tsx`, `src/app/[locale]/shop/page.tsx`

- [ ] **Step 1: Create CategoryFilter component**

Create `src/components/shop/CategoryFilter.tsx`:
- Client component (`'use client'`)
- Horizontal row of filter buttons: All, Distortion, Fuzz, Chorus, Reverb, Delay, Overdrive
- Active filter highlighted with amber background
- Uses URL search params (`?category=fuzz`) for filter state (shareable URLs)
- `useRouter` + `useSearchParams` from next/navigation

- [ ] **Step 2: Create ProductCard component**

Create `src/components/shop/ProductCard.tsx`:
- Link wrapper to `/shop/[slug]`
- Product image with aspect-square container
- Product name (localized), price (formatted), category badge
- Out-of-stock overlay if `!inStock`
- Hover: slight lift + amber border glow (framer-motion)

- [ ] **Step 3: Create ProductGrid component**

Create `src/components/shop/ProductGrid.tsx`:
- Receives filtered product array
- CSS Grid: 1 col on mobile, 2 on `sm`, 3 on `lg`
- Gap spacing consistent with design

- [ ] **Step 4: Create shop listing page**

Create `src/app/[locale]/shop/page.tsx`:
- Server component that reads `searchParams` for category filter
- Calls `getProducts(category)` from product service
- Renders CategoryFilter + ProductGrid
- Page title: "Shop" / "샵"
- `generateMetadata` for SEO

- [ ] **Step 5: Verify shop page**

```bash
npm run dev
```

Visit `/ko/shop` — all 6 products in grid. Click category filters — grid should filter. Cards should link to detail pages (404 for now is OK).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add shop listing page with category filters and product grid"
```

---

## Task 8: Shop — Product Detail Page

**Files:**
- Create: `src/app/[locale]/shop/[slug]/page.tsx`

- [ ] **Step 1: Create product detail page**

Create `src/app/[locale]/shop/[slug]/page.tsx`:
- Server component, receives `params.slug`
- Calls `getProductBySlug(slug)` — if not found, call `notFound()`
- Layout: 2-column on desktop (image left, info right), stacked on mobile
- Left: Large product image (use `next/image` for all images throughout the project)
- Right: Product name, category badge, price, description (localized)
- Specs table: key-value pairs from `product.specs`
- "Add to Cart" button (client island) — disabled if `!inStock` with "Out of Stock" label
- Related products: other products in same category (max 3), rendered as small ProductCards
- `generateMetadata` with product name, description, Open Graph
- JSON-LD structured data (`Product` schema with name, price, availability)

- [ ] **Step 2: Generate static params**

Add `generateStaticParams` to pre-generate all product slug pages at build time.

- [ ] **Step 3: Verify product detail page**

```bash
npm run dev
```

Visit `/ko/shop/hellfire` — product detail with image, specs, description. Toggle to EN. Check another product. Verify "Add to Cart" button appears (functionality in next task).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add product detail page with specs, metadata, and JSON-LD"
```

---

## Task 9: Cart Store + Cart Page

**Files:**
- Create: `src/lib/cart-store.ts`, `src/app/[locale]/cart/page.tsx`, `src/components/cart/CartItem.tsx`, `src/components/cart/CartSummary.tsx`
- Modify: `src/components/cart/CartIcon.tsx`, product detail page "Add to Cart" button

- [ ] **Step 1: Create zustand cart store**

Create `src/lib/cart-store.ts`:

```ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  items: { productId: string; quantity: number }[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}
```

- `addItem`: if product exists, increment quantity; otherwise add with quantity 1
- `removeItem`: remove the item entirely
- `updateQuantity`: set quantity; if 0, remove
- `clearCart`: empty the array
- `getTotalItems`: sum of all quantities
- Persist to localStorage with key `pedals-cart`

- [ ] **Step 2: Wire CartIcon to store**

Update `src/components/cart/CartIcon.tsx` to read `getTotalItems()` from the cart store and show the badge count. Must handle hydration mismatch (show 0 on server, real count after mount).

- [ ] **Step 3: Wire "Add to Cart" on product detail**

Add a client component wrapper on the product detail page that uses `useCartStore().addItem(product.id)`. Show brief confirmation feedback (e.g., button text changes to "Added!" for 1 second).

- [ ] **Step 4: Create CartItem component**

Create `src/components/cart/CartItem.tsx`:
- Resolves full product via `getProductById(item.productId)` — passed as prop from the page
- Shows: product image (small), name, price, quantity selector (- / number / +), remove button
- Calls `updateQuantity` and `removeItem` from store

- [ ] **Step 5: Create CartSummary component**

Create `src/components/cart/CartSummary.tsx`:
- Shows subtotal (sum of price * quantity for all items)
- "Checkout" / "주문하기" button → links to `/checkout`
- If cart empty, show "Your cart is empty" message with link to Shop

- [ ] **Step 6: Create cart page**

Create `src/app/[locale]/cart/page.tsx`:
- Client component (needs cart store access)
- Reads cart items from store, resolves products
- Renders CartItem list + CartSummary
- Page title: "Cart" / "장바구니"

- [ ] **Step 7: Verify full cart flow**

```bash
npm run dev
```

1. Go to `/ko/shop/hellfire` → click "Add to Cart" → badge updates
2. Add another product
3. Go to `/ko/cart` → see items, change quantities, remove one
4. Refresh page → cart persists (localStorage)
5. "Checkout" button links to checkout page

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add zustand cart store, cart page, and add-to-cart flow"
```

---

## Task 10: Checkout Placeholder

**Files:**
- Create: `src/app/[locale]/checkout/page.tsx`, `src/components/checkout/CheckoutForm.tsx`, `src/components/checkout/OrderSummary.tsx`

- [ ] **Step 1: Create OrderSummary component**

Create `src/components/checkout/OrderSummary.tsx`:
- Reads cart from store, resolves products
- Lists items with name, quantity, line total
- Shows order total

- [ ] **Step 2: Create CheckoutForm component**

Create `src/components/checkout/CheckoutForm.tsx`:
- Form fields: name, email, phone, address (all required)
- Client-side validation (required fields)
- Submit button: "Place Order" / "주문하기"
- On submit: shows confirmation message "Thank you! Payment integration coming soon. We'll contact you via email." / "감사합니다! 결제 시스템 준비 중입니다. 이메일로 연락드리겠습니다."
- Clears cart after "order"

- [ ] **Step 3: Create checkout page**

Create `src/app/[locale]/checkout/page.tsx`:
- 2-column layout: CheckoutForm (left), OrderSummary (right)
- If cart is empty, redirect to cart page
- Page title: "Checkout" / "주문"

- [ ] **Step 4: Verify checkout flow**

```bash
npm run dev
```

1. Add items to cart → go to checkout
2. Fill form → submit → see confirmation message
3. Cart should be cleared

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add checkout placeholder with shipping form and order summary"
```

---

## Task 11: SEO, Metadata & Polish

**Files:**
- Create: `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/[locale]/not-found.tsx`
- Modify: `src/app/[locale]/layout.tsx` (global metadata)

- [ ] **Step 1: Add global metadata**

Update `src/app/[locale]/layout.tsx` `generateMetadata`:
- Title template: `%s | PEDALS`
- Default title: `PEDALS — Handcrafted Guitar Pedals`
- Description (localized)
- Open Graph: site name, locale, image (`/images/brand/og-image.png`)

- [ ] **Step 2: Create robots.ts**

Create `src/app/robots.ts`:

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://pedals.kr/sitemap.xml',
  };
}
```

- [ ] **Step 3: Create sitemap.ts**

Create `src/app/sitemap.ts` — generates entries for all locale + page combinations. Includes landing page, shop, and all product detail pages (from `getProducts()`).

- [ ] **Step 4: Create not-found page**

Create `src/app/[locale]/not-found.tsx`:
- Styled 404 page matching the vintage theme
- "Page not found" / "페이지를 찾을 수 없습니다"
- Link back to home

- [ ] **Step 5: Build and verify**

```bash
npm run build
```

Expected: Build completes without errors. Check that static pages are generated.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add SEO metadata, sitemap, robots.txt, and 404 page"
```

---

## Task 12: GitHub Repo + Vercel Deployment

**Files:**
- Modify: `.gitignore` (verify)

- [ ] **Step 1: Create GitHub repository**

```bash
gh repo create pedals-kr-shop --public --source=. --remote=origin
```

- [ ] **Step 2: Push to GitHub**

```bash
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Deploy to Vercel**

```bash
npx vercel --yes
npx vercel --prod
```

- [ ] **Step 4: Connect pedals.kr domain**

After Vercel deployment, configure custom domain:

```bash
npx vercel domains add pedals.kr
```

Follow DNS instructions output by Vercel. User will need to update DNS records at their domain registrar.

- [ ] **Step 5: Verify production deployment**

Visit the Vercel URL — verify all pages work: landing, shop, product detail, cart, checkout. Both KO and EN locales. Verify mobile responsiveness.

- [ ] **Step 6: Commit any deployment config changes**

```bash
git add -A
git commit -m "chore: add Vercel deployment configuration"
git push
```
