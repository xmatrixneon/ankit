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
