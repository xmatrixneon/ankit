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
