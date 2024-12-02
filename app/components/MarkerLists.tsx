'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { searchMarkers } from '../marker';
import { Marker } from '@prisma/client';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageCircle, Tag } from 'lucide-react';
import Pagination from './Pagination';
import { useSearchParams } from 'next/navigation';

export default function MarkerLists() {
  const searchParams = useSearchParams();
  const router = useRouter();

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
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedCategory(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query) params.set('filter', query);
    if (selectedCategory) params.set('category', selectedCategory);
    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-[200px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="h-[250px] w-full" />
              <CardContent className="mt-4">
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
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
    <div className="space-y-8">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="search..."
        />
        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">select category</option>
          <option value="観光">観光</option>
          <option value="食事">食事</option>
          <option value="家族">家族</option>
        </select>
        <input type="submit" value="submit" />
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
  );
}
