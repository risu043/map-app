'use client';

import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMarkers } from '../marker';
import { Marker } from '@prisma/client';

export default function MarkerLists() {
  const queryClient = useQueryClient();

  const {
    data: markers,
    isLoading,
    isError,
    error,
  } = useQuery<Marker[], Error>({
    queryKey: ['fetchMarkers'],
    queryFn: fetchMarkers,
    initialData: queryClient.getQueryData(['fetchMarkers']),
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
    <ul>
      {markers.map((marker) => (
        <li key={marker.id}>
          <Link href={`/lists/${marker.id}`}>
            <div className="p-8 mb-8 rounded-xl shadow-md md:w-80">
              <p>{marker.title}</p>
              <p>{marker.message}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
