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

/**
 * Validates and sanitizes affiliate URLs to prevent XSS and open redirect attacks.
 * Only allows http:// and https:// protocols.
 */
export function getSafeAffiliateUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  // Trim whitespace
  const trimmedUrl = url.trim();

  // Validate protocol - only allow http:// and https://
  if (!trimmedUrl.startsWith('https://') && !trimmedUrl.startsWith('http://')) {
    console.warn('Invalid affiliate URL protocol:', trimmedUrl);
    return undefined;
  }

  // Additional check for javascript: and data: protocols (defense in depth)
  if (trimmedUrl.startsWith('javascript:') || trimmedUrl.startsWith('data:')) {
    console.warn('Blocked dangerous URL protocol:', trimmedUrl);
    return undefined;
  }

  return trimmedUrl;
}
