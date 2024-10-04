'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { fetchMarkers } from '../marker';
import { Marker } from '@prisma/client';

export default function MarkerLists() {
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
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : 'An error occurred'}
      </div>
    );
  }

  if (!markers || markers.length === 0) {
    return <div>No markers found</div>;
  }

  return (
    <ul className=" md:grid grid-cols-[350px_350px] gap-8">
      {markers.map((marker) => (
        <li key={marker.id}>
          <Link href={`/lists/${marker.id}`}>
            <div className="mb-8 rounded-xl shadow-md">
              <div className="h-[250px] relative">
                <Image
                  src={
                    marker.image === 'noimage'
                      ? '/images/noimage.jpg'
                      : marker.image
                  }
                  alt="image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  priority
                  className="rounded-t-xl object-cover"
                />
              </div>
              <p className="p-4">{marker.title}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
