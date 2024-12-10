'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { searchMarkers } from '../marker';
import { Marker } from '@prisma/client';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageCircle, Tag } from 'lucide-react';
import Pagination from './Pagination';

export default function MarkerLists({
  filter,
  category,
  page,
}: {
  filter: string;
  category: string;
  page: number;
}) {
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
    <div className="space-y-8">
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
      <Pagination hitCount={data.hitCount} />
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index}>
            <Skeleton className="h-[340px] w-full" />
          </Card>
        ))}
      </div>
    </div>
  );
}
