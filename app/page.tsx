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
