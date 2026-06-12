# Affiliate Coupon Site Design

**Date:** 2025-06-12
**Project:** ankit-offer
**Type:** New website

## Overview

A clean, minimal affiliate coupon site where users browse deals by category, view detailed coupon information, and click through to external stores to make purchases. The site earns commission on qualifying purchases.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (radix-rhea variant)
- **Data:** JSON files (no database/CMS initially)
- **Icons:** lucide-react

## Data Layer

### categories.json
```json
[
  {
    "id": "tech",
    "name": "Technology",
    "slug": "tech",
    "description": "Electronics, software, and gadgets",
    "icon": "laptop"
  },
  {
    "id": "fashion",
    "name": "Fashion",
    "slug": "fashion",
    "description": "Clothing, shoes, and accessories",
    "icon": "shirt"
  }
]
```

### coupons.json
```json
[
  {
    "id": "amazon-echo-50",
    "slug": "amazon-echo-50",
    "title": "50% off Amazon Echo",
    "description": "Save big on smart speakers this week only",
    "category": "tech",
    "store": "Amazon",
    "discount": "50%",
    "code": "ECHO50",
    "expiration": "2025-12-31",
    "affiliateUrl": "https://amazon.com/echo?tag=your-id",
    "verified": true,
    "featured": true
  }
]
```

**Field Descriptions:**
- `id`, `slug` — Unique identifiers
- `category` — References category.id
- `discount` — Display text ("50%", "$20 off", "Free Shipping")
- `verified` — Boolean for verified badge
- `featured` — Boolean for homepage featured section
- `code` — Optional (null if no code needed)

## Pages

### Homepage (`/`)
- Hero section with headline, subheadline, CTA
- Category grid (responsive: 2-3 cols tablet, 3-4 cols desktop)
- Featured deals section (3-6 highlighted deals)
- Trust signals in footer

### Category Page (`/categories/[slug]`)
- Category header: name, icon, description
- Deals grid for this category
- Optional: filter by discount type, sort by expiration

### Deal Page (`/deals/[slug]`)
- Deal header: title, store name, discount amount
- Coupon code section: large code, copy button, feedback
- Deal details: description, expiration, terms
- Related deals (3-4 from same category)
- CTA button to affiliate URL

### Static Pages
- **About:** Company/mission information
- **Contact:** Contact information or form
- **Privacy:** Privacy policy
- **Terms:** Terms of service

## Components

### DealCard
- Displays: title, discount badge, store name, brief description
- Action: "View Deal" button to deal page
- States: normal, verified (badge), expiring soon

### CategoryCard
- Displays: icon, name, description
- Action: entire card links to category page
- Hover: subtle border/shadow change

### CouponCode
- Displays: large code in highlighted box, copy button
- Interaction: click to copy → "Copied!" feedback (2s) → revert
- Fallback: manual copy instruction if clipboard API unavailable

### Navigation
- Header with logo/name
- Links: Home, Categories, About, Contact
- Mobile: hamburger menu (if time), otherwise stacked

### Footer
- Links: Privacy, Terms, Contact
- Copyright text

## Styling

### Design Tokens
- **Border radius:** 8px
- **Shadows:** Subtle, single elevation
- **Transitions:** 150ms for hover states
- **Spacing:** 4px/8px base unit, generous padding

### Color Palette
- **Primary:** Subtle blue/indigo (buttons, links)
- **Secondary:** Warm accent for discounts (amber/soft orange)
- **Background:** White/off-white
- **Text:** Slate/gray scale
- **Borders:** Light gray

### Typography
- **Headings:** Inter, 600-700 weight
- **Body:** Inter, 400 weight
- **Coupon codes:** Geist Mono

## File Structure

```
app/
├── layout.tsx              # Root layout with fonts
├── page.tsx                # Homepage
├── globals.css             # Global styles
├── about/
│   └── page.tsx
├── categories/
│   └── [slug]/
│       └── page.tsx
├── deals/
│   └── [slug]/
│       └── page.tsx
├── contact/
│   └── page.tsx
├── privacy/
│   └── page.tsx
└── terms/
    └── page.tsx

components/
├── ui/                     # shadcn/ui components
│   └── button.tsx
├── DealCard.tsx
├── CategoryCard.tsx
├── CouponCode.tsx
├── Navigation.tsx
└── Footer.tsx

data/
├── categories.json
└── coupons.json

lib/
└── utils.ts                # cn() utility
```

## Error Handling

- Empty category → "No deals available" message
- Missing coupon code → "No code needed — click to activate"
- Expired deals → "Expired" badge, reduced prominence
- Invalid routes → 404 page with home link
- Copy failure → Manual copy instruction
- External links → `target="_blank" rel="noopener noreferrer"`

## SEO & Metadata

- Homepage: "Best Deals & Coupons - Save Money"
- Category pages: Dynamic metadata with category name
- Deal pages: Dynamic title (store + discount), description
- Canonical URLs on all pages
- Schema.org `Offer` JSON-LD on deal pages

## Implementation Phases

### Phase 1: Core (MVP)
1. Data structure (categories.json, coupons.json with sample data)
2. Homepage (hero + category grid)
3. Category pages (deal listings)
4. Deal pages (coupon code component)
5. Navigation and Footer
6. Privacy Policy

### Phase 2: Additional Pages
7. Terms of Service
8. About page
9. Contact page

### Phase 3: Polish (if time)
10. Deal expiration indicators
11. Verified badges
12. Responsive refinements
