'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function EnhancedSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearchInput(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('filter', term);
    } else {
      params.delete('filter');
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  }

  function handleSearchCategory(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term !== 'all') {
      params.set('category', term);
    } else {
      params.delete('category');
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto p-4 mb-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
          placeholder="検索..."
          onChange={(e) => handleSearchInput(e.target.value)}
          defaultValue={searchParams.get('filter') ?? ''}
          aria-label="検索入力"
        />
      </div>
      <Select
        onValueChange={handleSearchCategory}
        defaultValue={searchParams.get('category') ?? 'all'}
      >
        <SelectTrigger className="w-full sm:w-[200px] rounded-full border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300">
          <SelectValue placeholder="カテゴリー選択" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">select category</SelectItem>
          <SelectItem value="観光">観光</SelectItem>
          <SelectItem value="食事">食事</SelectItem>
          <SelectItem value="家族">家族</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
