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
