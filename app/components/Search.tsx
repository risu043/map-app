'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function Search() {
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
    <>
      <Input
        className="w-full sm:w-[200px]"
        placeholder="search..."
        onChange={(e) => {
          handleSearchInput(e.target.value);
        }}
        defaultValue={searchParams.get('filter')?.toString()}
      />
      <Select
        onValueChange={handleSearchCategory}
        defaultValue={searchParams.get('category')?.toString()}
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">select category</SelectItem>
          <SelectItem value="観光">観光</SelectItem>
          <SelectItem value="食事">食事</SelectItem>
          <SelectItem value="家族">家族</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
