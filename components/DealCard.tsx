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
