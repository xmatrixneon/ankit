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
