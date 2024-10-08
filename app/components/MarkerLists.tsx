'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { fetchMarkers } from '../marker';
import { Marker } from '@prisma/client';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Tag } from 'lucide-react';

export default function MarkerLists() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  const {
    data: markers,
    isLoading,
    isError,
    error,
  } = useQuery<Marker[], Error>({
    queryKey: ['fetchMarkers'],
    queryFn: fetchMarkers,
  });

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

  if (!markers) {
    return (
      <div className="text-center text-muted-foreground">No markers found</div>
    );
  }

  const categories = ['sample1', 'sample2', 'sample3'];
  const filteredMarkers =
    selectedCategory === undefined
      ? markers
      : markers.filter((marker) => marker.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <Tag className="h-5 w-5" />
        <Select
          value={selectedCategory ?? undefined}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMarkers.map((marker) => (
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
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{marker.category}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
