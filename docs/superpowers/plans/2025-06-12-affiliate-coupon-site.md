# Affiliate Coupon Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a clean, minimal affiliate coupon site with category browsing, deal pages, and copy-to-clipboard functionality.

**Architecture:** Next.js 16 App Router with JSON-based data layer. Pages consume data from static JSON files. Components are reusable UI primitives using shadcn/ui patterns.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript, shadcn/ui (radix-rhea), lucide-react

---

## File Structure Map

```
app/
├── layout.tsx              # MODIFY: Add Navigation component
├── page.tsx                # MODIFY: Replace with homepage
├── globals.css             # MODIFY: Add custom styles
├── about/
│   └── page.tsx            # CREATE: About page
├── categories/
│   └── [slug]/
│       └── page.tsx        # CREATE: Category page
├── deals/
│   └── [slug]/
│       └── page.tsx        # CREATE: Deal page
├── contact/
│   └── page.tsx            # CREATE: Contact page
├── privacy/
│   └── page.tsx            # CREATE: Privacy page
└── terms/
    └── page.tsx            # CREATE: Terms page

components/
├── ui/                     # Existing shadcn components
│   └── button.tsx
├── DealCard.tsx            # CREATE: Deal card component
├── CategoryCard.tsx        # CREATE: Category card component
├── CouponCode.tsx          # CREATE: Copyable code component
├── Navigation.tsx          # CREATE: Site navigation
└── Footer.tsx              # CREATE: Site footer

data/
├── categories.json         # CREATE: Category data
└── coupons.json            # CREATE: Coupon/deal data

lib/
├── utils.ts                # EXISTING: cn() utility
└── data.ts                 # CREATE: Data fetching utilities
```

---

## Task 1: Create Data Structure

**Files:**
- Create: `data/categories.json`
- Create: `data/coupons.json`

- [ ] **Step 1: Create categories.json with sample categories**

```json
[
  {
    "id": "tech",
    "name": "Technology",
    "slug": "tech",
    "description": "Electronics, software, and gadgets",
    "icon": "Laptop"
  },
  {
    "id": "fashion",
    "name": "Fashion",
    "slug": "fashion",
    "description": "Clothing, shoes, and accessories",
    "icon": "Shirt"
  },
  {
    "id": "home",
    "name": "Home & Garden",
    "slug": "home",
    "description": "Furniture, decor, and household essentials",
    "icon": "Home"
  },
  {
    "id": "food",
    "name": "Food & Dining",
    "slug": "food",
    "description": "Restaurants, groceries, and meal delivery",
    "icon": "Utensils"
  },
  {
    "id": "travel",
    "name": "Travel",
    "slug": "travel",
    "description": "Flights, hotels, and vacation packages",
    "icon": "Plane"
  },
  {
    "id": "sports",
    "name": "Sports & Fitness",
    "slug": "sports",
    "description": "Athletic gear, gym memberships, and outdoor activities",
    "icon": "Dumbbell"
  }
]
```

- [ ] **Step 2: Create coupons.json with sample deals**

```json
[
  {
    "id": "amazon-echo-50",
    "slug": "amazon-echo-50",
    "title": "50% off Amazon Echo Dot",
    "description": "Save big on the latest smart speaker. Perfect for music, smart home control, and more.",
    "category": "tech",
    "store": "Amazon",
    "discount": "50%",
    "code": "ECHO50",
    "expiration": "2025-12-31",
    "affiliateUrl": "https://amazon.com/echo-dot",
    "verified": true,
    "featured": true
  },
  {
    "id": "nike-shoes-30",
    "slug": "nike-shoes-30",
    "title": "30% off Nike Running Shoes",
    "description": "Get the perfect pair of running shoes at a discount. Limited time offer on select styles.",
    "category": "fashion",
    "store": "Nike",
    "discount": "30%",
    "code": "NIKE30",
    "expiration": "2025-08-15",
    "affiliateUrl": "https://nike.com/running",
    "verified": true,
    "featured": true
  },
  {
    "id": "uber-eats-free",
    "slug": "uber-eats-free",
    "title": "Free Delivery on First Order",
    "description": "New users get free delivery on their first food order. No minimum purchase required.",
    "category": "food",
    "store": "Uber Eats",
    "discount": "Free Delivery",
    "code": "EATSFREE",
    "expiration": "2025-09-30",
    "affiliateUrl": "https://ubereats.com",
    "verified": true,
    "featured": false
  },
  {
    "id": "ikea-furniture",
    "slug": "ikea-furniture",
    "title": "Up to 40% off Select Furniture",
    "description": "Transform your home with discounted furniture. Living room, bedroom, and dining options available.",
    "category": "home",
    "store": "IKEA",
    "discount": "40%",
    "code": null,
    "expiration": "2025-07-31",
    "affiliateUrl": "https://ikea.com/sale",
    "verified": true,
    "featured": true
  },
  {
    "id": "expedia-flights",
    "slug": "expedia-flights",
    "title": "$100 off Flight Bookings",
    "description": "Save on your next vacation. $100 off when you spend $500 or more on flights.",
    "category": "travel",
    "store": "Expedia",
    "discount": "$100",
    "code": "FLY100",
    "expiration": "2025-10-01",
    "affiliateUrl": "https://expedia.com/flights",
    "verified": false,
    "featured": false
  },
  {
    "id": "fitbit-tracker",
    "slug": "fitbit-tracker",
    "title": "25% off Fitness Trackers",
    "description": "Track your health and save. Discount applies to all Fitbit devices.",
    "category": "sports",
    "store": "Fitbit",
    "discount": "25%",
    "code": "FIT25",
    "expiration": "2025-11-15",
    "affiliateUrl": "https://fitbit.com/shop",
    "verified": true,
    "featured": false
  },
  {
    "id": "bestbuy-laptop",
    "slug": "bestbuy-laptop",
    "title": "$150 off Laptops $800+",
    "description": "Upgrade your productivity. $150 off select laptops priced at $800 or more.",
    "category": "tech",
    "store": "Best Buy",
    "discount": "$150",
    "code": "LAPTOP150",
    "expiration": "2025-08-31",
    "affiliateUrl": "https://bestbuy.com/laptops",
    "verified": true,
    "featured": false
  },
  {
    "id": "target-fashion",
    "slug": "target-fashion",
    "title": "Buy 2 Get 1 Free Clothing",
    "description": "Stock up on essentials. Buy two clothing items, get one free. Mix and match styles.",
    "category": "fashion",
    "store": "Target",
    "discount": "B2G1",
    "code": "STYLEB2G1",
    "expiration": "2025-07-15",
    "affiliateUrl": "https://target.com/clothing",
    "verified": true,
    "featured": false
  }
]
```

- [ ] **Step 3: Commit data structure**

```bash
git add data/
git commit -m "feat: add category and coupon data structure"
```

---

## Task 2: Create Data Utilities

**Files:**
- Create: `lib/data.ts`

- [ ] **Step 1: Create TypeScript types and data fetchers**

```typescript
import categoriesJson from '@/data/categories.json';
import couponsJson from '@/data/coupons.json';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface Coupon {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  store: string;
  discount: string;
  code: string | null;
  expiration: string;
  affiliateUrl: string;
  verified: boolean;
  featured: boolean;
}

export const categories: Category[] = categoriesJson as Category[];
export const coupons: Coupon[] = couponsJson as Coupon[];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(cat => cat.slug === slug);
}

export function getCouponsByCategory(categoryId: string): Coupon[] {
  return coupons.filter(coupon => coupon.category === categoryId);
}

export function getFeaturedCoupons(): Coupon[] {
  return coupons.filter(coupon => coupon.featured);
}

export function getCouponBySlug(slug: string): Coupon | undefined {
  return coupons.find(coupon => coupon.slug === slug);
}

export function getRelatedCoupons(slug: string, category: string, limit = 4): Coupon[] {
  return coupons
    .filter(coupon => coupon.category === category && coupon.slug !== slug)
    .slice(0, limit);
}
```

- [ ] **Step 2: Commit data utilities**

```bash
git add lib/data.ts
git commit -m "feat: add data utilities with TypeScript types"
```

---

## Task 3: Create Navigation Component

**Files:**
- Create: `components/Navigation.tsx`

- [ ] **Step 1: Create Navigation component**

```typescript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-900">
            CouponHub
          </Link>
          <div className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-slate-900',
                  pathname === item.href
                    ? 'text-slate-900'
                    : 'text-slate-600'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit Navigation component**

```bash
git add components/Navigation.tsx
git commit -m "feat: add Navigation component"
```

---

## Task 4: Create Footer Component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Footer component**

```typescript
import Link from 'next/link';

const footerLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="border-t bg-white py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 transition-colors hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} CouponHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit Footer component**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 5: Create CategoryCard Component

**Files:**
- Create: `components/CategoryCard.tsx`

- [ ] **Step 1: Create CategoryCard component with lucide-react icons**

```typescript
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/lib/data';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = Icons[category.icon as keyof typeof Icons] as Icons.LucideIcon;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex flex-col items-center text-center">
        {IconComponent && (
          <div className="mb-3 rounded-full bg-slate-100 p-4">
            <IconComponent className="h-6 w-6 text-slate-700" />
          </div>
        )}
        <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-slate-700">
          {category.name}
        </h3>
        <p className="text-sm text-slate-600">{category.description}</p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Commit CategoryCard component**

```bash
git add components/CategoryCard.tsx
git commit -m "feat: add CategoryCard component"
```

---

## Task 6: Create DealCard Component

**Files:**
- Create: `components/DealCard.tsx`

- [ ] **Step 1: Create DealCard component**

```typescript
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { Coupon } from '@/lib/data';

interface DealCardProps {
  deal: Coupon;
}

export function DealCard({ deal }: DealCardProps) {
  const isExpired = new Date(deal.expiration) < new Date();

  return (
    <Link
      href={`/deals/${deal.slug}`}
      className="group block rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between">
        <span className="text-sm font-medium text-slate-600">{deal.store}</span>
        {isExpired ? (
          <Badge variant="secondary" className="bg-slate-100 text-slate-600">
            Expired
          </Badge>
        ) : deal.verified && (
          <Badge className="bg-emerald-100 text-emerald-700">
            Verified
          </Badge>
        )}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-slate-700">
        {deal.title}
      </h3>
      <p className="mb-4 text-sm text-slate-600 line-clamp-2">{deal.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-orange-600">{deal.discount}</span>
        <span className="text-sm font-medium text-slate-700 group-hover:underline">
          View Deal →
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Check if Badge component exists, if not add it**

First, check:
```bash
ls components/ui/
```

If no badge.tsx, add the shadcn badge component:
```bash
npx shadcn@latest add badge
```

- [ ] **Step 3: Commit DealCard component**

```bash
git add components/DealCard.tsx
git commit -m "feat: add DealCard component"
```

---

## Task 7: Create CouponCode Component

**Files:**
- Create: `components/CouponCode.tsx`

- [ ] **Step 1: Create copyable coupon code component**

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CouponCodeProps {
  code: string | null;
}

export function CouponCode({ code }: CouponCodeProps) {
  const [copied, setCopied] = useState(false);

  if (!code) {
    return (
      <div className="rounded-lg bg-slate-50 px-4 py-3 text-center">
        <p className="text-sm font-medium text-slate-700">
          No code required — click "Get This Deal" to activate
        </p>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6">
      <div className="flex items-center justify-between gap-4">
        <code className="text-2xl font-mono font-semibold tracking-wider text-slate-900">
          {code}
        </code>
        <Button
          onClick={handleCopy}
          variant={copied ? 'default' : 'outline'}
          className={cn(
            'min-w-[100px]',
            copied && 'bg-emerald-600 hover:bg-emerald-700'
          )}
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit CouponCode component**

```bash
git add components/CouponCode.tsx
git commit -m "feat: add CouponCode component with copy-to-clipboard"
```

---

## Task 8: Update Root Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add Navigation and Footer to root layout**

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CouponHub - Best Deals & Coupons",
  description: "Save money with verified deals and coupons from your favorite stores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit layout update**

```bash
git add app/layout.tsx
git commit -m "feat: integrate Navigation and Footer into layout"
```

---

## Task 9: Create Homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Create homepage with hero and category grid**

```typescript
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/CategoryCard';
import { DealCard } from '@/components/DealCard';
import { categories, getFeaturedCoupons } from '@/lib/data';

export default function HomePage() {
  const featuredDeals = getFeaturedCoupons();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">
          Save Money Every Day
        </h1>
        <p className="mb-8 text-lg text-slate-600">
          Discover verified deals and coupons from your favorite stores. Updated daily.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/categories">Browse Categories</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/deals">All Deals</Link>
          </Button>
        </div>
      </section>

      {/* Category Grid */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Shop by Category</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Deals */}
      {featuredDeals.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Featured Deals</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit homepage**

```bash
git add app/page.tsx
git commit -m "feat: add homepage with hero and category grid"
```

---

## Task 10: Create Category Page

**Files:**
- Create: `app/categories/[slug]/page.tsx`

- [ ] **Step 1: Create dynamic category page**

```typescript
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, getCouponsByCategory, coupons } from '@/lib/data';
import { DealCard } from '@/components/DealCard';

export async function generateStaticParams() {
  return coupons.map((coupon) => ({
    slug: coupon.slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const categoryCoupons = getCouponsByCategory(category.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-slate-600">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-slate-900">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8 rounded-lg bg-slate-50 p-6">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">{category.name}</h1>
        <p className="text-slate-600">{category.description}</p>
      </div>

      {/* Deals Grid */}
      {categoryCoupons.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryCoupons.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">No deals available in this category yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit category page**

```bash
git add app/categories/
git commit -m "feat: add category page with deal listings"
```

---

## Task 11: Create Deal Page

**Files:**
- Create: `app/deals/[slug]/page.tsx`

- [ ] **Step 1: Create dynamic deal page with metadata**

```typescript
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCouponBySlug, getRelatedCoupons } from '@/lib/data';
import { CouponCode } from '@/components/CouponCode';
import { DealCard } from '@/components/DealCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const deal = getCouponBySlug(params.slug);

  if (!deal) {
    return {
      title: 'Deal Not Found',
    };
  }

  return {
    title: `${deal.store} - ${deal.discount} | CouponHub`,
    description: deal.description,
  };
}

export async function generateStaticParams() {
  const { coupons } = await import('@/lib/data');
  return coupons.map((coupon) => ({
    slug: coupon.slug,
  }));
}

export default function DealPage({ params }: PageProps) {
  const deal = getCouponBySlug(params.slug);

  if (!deal) {
    notFound();
  }

  const isExpired = new Date(deal.expiration) < new Date();
  const relatedDeals = getRelatedCoupons(deal.slug, deal.category);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-slate-600">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/categories/${deal.category}`}>Deals</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-slate-900">{deal.title}</span>
      </nav>

      {/* Deal Header */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600">{deal.store}</span>
          {isExpired ? (
            <Badge variant="secondary" className="bg-slate-100 text-slate-600">
              Expired
            </Badge>
          ) : deal.verified && (
            <Badge className="bg-emerald-100 text-emerald-700">
              Verified
            </Badge>
          )}
        </div>
        <h1 className="mb-2 text-3xl font-bold text-slate-900">{deal.title}</h1>
        <p className="text-lg text-slate-600">{deal.description}</p>
      </div>

      {/* Discount Badge */}
      <div className="mb-6">
        <div className="inline-block rounded-full bg-orange-100 px-6 py-3">
          <span className="text-2xl font-bold text-orange-700">{deal.discount}</span>
        </div>
      </div>

      {/* Coupon Code */}
      {!isExpired && (
        <div className="mb-6">
          <CouponCode code={deal.code} />
        </div>
      )}

      {/* Deal Details */}
      <div className="mb-8 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-slate-900">Deal Details</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-600">Expires:</dt>
            <dd className="font-medium text-slate-900">
              {new Date(deal.expiration).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-600">Store:</dt>
            <dd className="font-medium text-slate-900">{deal.store}</dd>
          </div>
          {deal.code && (
            <div className="flex justify-between">
              <dt className="text-slate-600">Code Required:</dt>
              <dd className="font-medium text-slate-900">Yes</dd>
            </div>
          )}
        </dl>
      </div>

      {/* CTA Button */}
      {!isExpired && (
        <div className="mb-12">
          <Button asChild size="lg" className="w-full">
            <a
              href={deal.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get This Deal
            </a>
          </Button>
        </div>
      )}

      {/* Related Deals */}
      {relatedDeals.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-bold text-slate-900">Similar Deals</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {relatedDeals.map((relatedDeal) => (
              <DealCard key={relatedDeal.id} deal={relatedDeal} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit deal page**

```bash
git add app/deals/
git commit -m "feat: add deal page with coupon code and related deals"
```

---

## Task 12: Create About Page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create about page**

```typescript
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">About CouponHub</h1>

      <div className="prose prose-slate max-w-none">
        <p className="mb-4 text-slate-600">
          CouponHub is your trusted source for verified deals and coupons from top retailers.
          We scour the web to find the best discounts so you don't have to.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Our Mission</h2>
        <p className="mb-4 text-slate-600">
          We believe everyone deserves to save money on the things they need and love.
          Our team works daily to verify deals, update expired offers, and bring you
          the most current savings opportunities.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">How It Works</h2>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>Browse categories or search for your favorite stores</li>
          <li>Find a deal that interests you</li>
          <li>Copy the coupon code (if required)</li>
          <li>Click through to the store and apply the code at checkout</li>
          <li>Enjoy your savings!</li>
        </ul>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Verified Deals</h2>
        <p className="text-slate-600">
          Look for the "Verified" badge on our deals. These have been tested and confirmed
          to work by our team. We update our database daily to ensure you're always
          seeing current offers.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit about page**

```bash
git add app/about/
git commit -m "feat: add about page"
```

---

## Task 13: Create Contact Page

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create contact page**

```typescript
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Contact Us</h1>

      <div className="mb-8 rounded-lg border border-slate-200 bg-white p-6">
        <p className="mb-4 text-slate-600">
          Have a question, suggestion, or found a deal that isn't working?
          We'd love to hear from you.
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="mb-1 font-semibold text-slate-900">Email</h2>
            <a
              href="mailto:support@couponhub.com"
              className="text-blue-600 hover:underline"
            >
              support@couponhub.com
            </a>
          </div>

          <div>
            <h2 className="mb-1 font-semibold text-slate-900">Business Inquiries</h2>
            <a
              href="mailto:business@couponhub.com"
              className="text-blue-600 hover:underline"
            >
              business@couponhub.com
            </a>
          </div>

          <div>
            <h2 className="mb-1 font-semibold text-slate-900">Submit a Deal</h2>
            <p className="text-sm text-slate-600">
              Know about a great deal we're missing? Send it to{' '}
              <a href="mailto:deals@couponhub.com" className="text-blue-600 hover:underline">
                deals@couponhub.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm text-slate-600">
          <strong>Note:</strong> We are not affiliated with any of the stores or brands
          listed on our site. All coupons and deals are provided for informational purposes.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit contact page**

```bash
git add app/contact/
git commit -m "feat: add contact page"
```

---

## Task 14: Create Privacy Policy Page

**Files:**
- Create: `app/privacy/page.tsx`

- [ ] **Step 1: Create privacy policy page**

```typescript
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Privacy Policy</h1>

      <div className="prose prose-slate max-w-none">
        <p className="mb-4 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Information We Collect</h2>
        <p className="mb-4 text-slate-600">
          CouponHub collects minimal information to provide our service. We may collect:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>Usage data through analytics tools</li>
          <li>Browser type and device information</li>
          <li>IP address for security purposes</li>
        </ul>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">How We Use Information</h2>
        <p className="mb-4 text-slate-600">
          We use the information we collect to:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>Improve our service and user experience</li>
          <li>Analyze usage patterns</li>
          <li>Ensure site security</li>
        </ul>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Cookies</h2>
        <p className="mb-4 text-slate-600">
          We use cookies and similar technologies to remember your preferences and
          analyze site traffic. You can control cookie settings through your browser.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Third-Party Links</h2>
        <p className="mb-4 text-slate-600">
          Our site contains links to third-party retailers. We are not responsible for
          the privacy practices of these external sites. We encourage you to read their
          privacy policies.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Affiliate Relationships</h2>
        <p className="mb-4 text-slate-600">
          CouponHub participates in affiliate marketing programs. When you click on links
          and make purchases, we may earn a commission. This does not affect the price
          you pay or our editorial independence.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Contact</h2>
        <p className="text-slate-600">
          If you have questions about this privacy policy, please contact us at{' '}
          <a href="mailto:privacy@couponhub.com" className="text-blue-600 hover:underline">
            privacy@couponhub.com
          </a>
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit privacy policy page**

```bash
git add app/privacy/
git commit -m "feat: add privacy policy page"
```

---

## Task 15: Create Terms of Service Page

**Files:**
- Create: `app/terms/page.tsx`

- [ ] **Step 1: Create terms of service page**

```typescript
export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Terms of Service</h1>

      <div className="prose prose-slate max-w-none">
        <p className="mb-4 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Acceptance of Terms</h2>
        <p className="mb-4 text-slate-600">
          By accessing and using CouponHub, you accept and agree to be bound by these
          Terms of Service. If you do not agree to these terms, please do not use our service.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Description of Service</h2>
        <p className="mb-4 text-slate-600">
          CouponHub is a coupon aggregation website that displays deals and discounts
          from various third-party retailers. We do not sell products directly. All
          purchases are made through third-party websites.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Accuracy of Information</h2>
        <p className="mb-4 text-slate-600">
          While we strive to provide accurate and up-to-date information, we cannot guarantee
          that all coupons and deals are current or error-free. Retailers may change or
          discontinue promotions without notice. We recommend verifying deals at the retailer's
          website before making a purchase.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">User Conduct</h2>
        <p className="mb-4 text-slate-600">
          You agree not to:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>Use automated tools to scrape or harvest data from our site</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Use our service for any illegal or unauthorized purpose</li>
          <li>Reproduce, modify, or distribute our content without permission</li>
        </ul>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Affiliate Disclosure</h2>
        <p className="mb-4 text-slate-600">
          CouponHub contains affiliate links. When you make a purchase through these links,
          we may earn a commission. This helps support our service at no additional cost to you.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Disclaimer of Warranties</h2>
        <p className="mb-4 text-slate-600">
          CouponHub is provided "as is" without any warranties, expressed or implied. We do
          not guarantee uninterrupted or error-free operation of the service.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Limitation of Liability</h2>
        <p className="mb-4 text-slate-600">
          CouponHub and its operators shall not be liable for any indirect, incidental,
          special, or consequential damages resulting from the use or inability to use
          our service.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Changes to Terms</h2>
        <p className="mb-4 text-slate-600">
          We reserve the right to modify these terms at any time. Continued use of the
          service after changes constitutes acceptance of the new terms.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">Contact</h2>
        <p className="text-slate-600">
          Questions about these terms? Contact us at{' '}
          <a href="mailto:legal@couponhub.com" className="text-blue-600 hover:underline">
            legal@couponhub.com
          </a>
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit terms page**

```bash
git add app/terms/
git commit -m "feat: add terms of service page"
```

---

## Task 16: Update Global Styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add custom utility classes to globals.css**

First, read current contents:
```bash
cat app/globals.css
```

Then add these utility classes at the end of the file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom utilities */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
```

- [ ] **Step 2: Commit global styles**

```bash
git add app/globals.css
git commit -m "style: add custom utility classes"
```

---

## Task 17: Add Badge Component (if not exists)

**Files:**
- Create: `components/ui/badge.tsx`

- [ ] **Step 1: Check if badge exists, add if missing**

```bash
ls components/ui/badge.tsx 2>/dev/null || echo "Badge not found"
```

If not found, add the component:

```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

- [ ] **Step 2: Commit badge component**

```bash
git add components/ui/badge.tsx
git commit -m "feat: add Badge component"
```

---

## Task 18: Update Navigation with Categories Link

**Files:**
- Modify: `components/Navigation.tsx`

- [ ] **Step 1: Update Navigation to remove redundant "All Deals" link**

```typescript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-900">
            CouponHub
          </Link>
          <div className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-slate-900',
                  pathname === item.href
                    ? 'text-slate-900'
                    : 'text-slate-600'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit navigation update**

```bash
git add components/Navigation.tsx
git commit -m "fix: clean up navigation links"
```

---

## Task 19: Create Categories Index Page

**Files:**
- Create: `app/categories/page.tsx`

- [ ] **Step 1: Create categories listing page**

```typescript
import Link from 'next/link';
import { categories } from '@/lib/data';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">All Categories</h1>
      <p className="mb-8 text-slate-600">
        Browse deals by category. Click on any category to see current offers.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((category) => {
          const IconComponent = Icons[category.icon as keyof typeof Icons] as Icons.LucideIcon;

          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 hover:shadow-md"
            >
              {IconComponent && (
                <div className="rounded-full bg-slate-100 p-3">
                  <IconComponent className="h-5 w-5 text-slate-700" />
                </div>
              )}
              <div>
                <h2 className="font-semibold text-slate-900">{category.name}</h2>
                <p className="text-sm text-slate-600">{category.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit categories page**

```bash
git add app/categories/
git commit -m "feat: add categories index page"
```

---

## Task 20: Final Review and Test

**Files:**
- Test: Full application

- [ ] **Step 1: Build the application**

```bash
npm run build
```

Expected: Successful build with no errors

- [ ] **Step 2: Start the development server to verify**

```bash
npm run dev
```

Then manually test:
- Navigate to http://localhost:3000
- Test homepage, category pages, deal pages
- Test coupon code copy functionality
- Test navigation between all pages
- Test responsive design (resize browser)

- [ ] **Step 3: Run linting**

```bash
npm run lint
```

Fix any linting errors if they appear.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete affiliate coupon site MVP"
```

---

## Self-Review Checklist

- [ ] Spec coverage: All pages from spec implemented (Home, Category, Deal, About, Contact, Privacy, Terms)
- [ ] All components created (DealCard, CategoryCard, CouponCode, Navigation, Footer)
- [ ] Data layer complete (categories.json, coupons.json, data.ts utilities)
- [ ] No placeholders in code
- [ ] Type consistency throughout
- [ ] All file paths correct for Next.js 16 App Router
- [ ] SEO metadata included
- [ ] Affiliate links open in new tab with rel attributes

---

## Completion Criteria

The implementation is complete when:
1. All 18 tasks are checked off
2. Application builds successfully
3. All pages are accessible and render correctly
4. Coupon code copy functionality works
5. Navigation flows work between all pages
6. Responsive design adapts to mobile/tablet/desktop
