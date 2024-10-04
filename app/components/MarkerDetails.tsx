'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMarker } from '../marker';
import DeleteButton from './DeleteButton';
import GoogleMapSingle from './GoogleMapSingle';
import EditButton from './EditButton';
import { getCurrentUser } from '../auth';

export default function MarkerDetails({ markerId }: { markerId: number }) {
  const { data: marker, isLoading } = useQuery({
    queryKey: ['marker', markerId],
    queryFn: () => fetchMarker(markerId),
  });

  const { data: user } = useQuery({
    queryKey: ['current_user'],
    queryFn: getCurrentUser,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!marker) {
    return <div>No markers found</div>;
  }

  return (
    <div>
      <div className="mb-8">施設名: {marker.title}</div>
      <div className="mb-8">
        <GoogleMapSingle
          marker={{
            title: marker.title,
            position: { lat: marker.lat, lng: marker.lng },
          }}
        />
      </div>
      {user && (
        <div>
          <EditButton id={marker.id} />
          <DeleteButton id={marker.id} />
        </div>
      )}
    </div>
  );
}
