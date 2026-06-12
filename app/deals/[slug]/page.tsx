import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCouponBySlug, getRelatedCoupons, getSafeAffiliateUrl } from '@/lib/data';
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
  const safeAffiliateUrl = getSafeAffiliateUrl(deal.affiliateUrl);

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
      {!isExpired && safeAffiliateUrl && (
        <div className="mb-12">
          <Button asChild size="lg" className="w-full">
            <a
              href={safeAffiliateUrl}
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
