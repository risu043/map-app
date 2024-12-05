'use client';

import { fetchFavoriteMarkers } from '../likes';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart } from 'lucide-react';

export default function UserProfileEdit() {
  const { data: markers, isLoading } = useQuery({
    queryKey: ['current_user_like'],
    queryFn: fetchFavoriteMarkers,
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold">
          <Heart className="w-6 h-6 mr-2 text-red-500" />
          Favorites
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-full aspect-square rounded-lg"
              />
            ))}
          </div>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {markers?.map((marker) => (
              <li key={marker.id} className="group">
                <Link href={`/lists/${marker.markerid}`} className="block">
                  <div className="relative overflow-hidden rounded-lg aspect-square">
                    <Image
                      src={marker.markers.image}
                      alt={marker.markers.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      priority
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {marker.markers.title}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
