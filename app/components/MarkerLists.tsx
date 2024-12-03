'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { searchMarkers } from '../marker';
import { Marker } from '@prisma/client';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageCircle, Tag, Search } from 'lucide-react';
import Pagination from './Pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function MarkerLists() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filter = searchParams.get('filter') || '';
  const category = searchParams.get('category') || '';
  const page = Number(searchParams.get('page') || '1');
  type SearchResponse = {
    markers: (Marker & {
      _count: {
        posts: number;
      };
    })[];
    hitCount: number;
  };

  const { data, isLoading, isError, error } = useQuery<SearchResponse, Error>({
    queryKey: ['searchMarkers', { page, filter, category }],
    queryFn: () => searchMarkers({ page, filter, category }),
  });

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleCategoryChange = (value: string): void => {
    setSelectedCategory(value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set('filter', query);
    } else {
      params.delete('filter');
    }

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }

    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Error: {error instanceof Error ? error.message : 'An error occurred'}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-muted-foreground">No markers found</div>
    );
  }

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <div className="space-y-8">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                onChange={handleInputChange}
                value={query}
                placeholder="Search..."
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            <Select
              onValueChange={handleCategoryChange}
              value={selectedCategory}
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
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              検索
            </Button>
          </div>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.markers.map((marker) => (
            <Link
              href={`/lists/${marker.id}`}
              key={marker.id}
              className="no-underline"
            >
              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="h-[250px] relative">
                  <Image
                    src={marker.image}
                    alt={marker.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                    {marker.title}
                  </h3>
                  <div className="flex items-center space-x-6 text-muted-foreground">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Tag className="h-4 w-4" />
                      <span className="text-sm">{marker.category}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{marker._count.posts}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <Pagination
          page={page}
          filter={filter}
          category={category}
          hitCount={data.hitCount}
        />
      </div>
    </Suspense>
  );
}

function SkeletonLoader() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-10 w-[200px]" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index}>
            <Skeleton className="h-[250px] w-full" />
          </Card>
        ))}
      </div>
    </div>
  );
}
