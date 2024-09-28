'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMarker } from '../marker';
import DeleteButton from './DeleteButton';
import GoogleMapSingle from './GoogleMapSingle';
import EditButton from './EditButton';

export default function MarkerDetails({ markerId }: { markerId: number }) {
  const { data: marker, isLoading } = useQuery({
    queryKey: ['marker', markerId],
    queryFn: () => fetchMarker(markerId),
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
        <GoogleMapSingle marker={marker} />
      </div>
      <div>
        <EditButton id={marker.id} />
        <DeleteButton id={marker.id} />
      </div>
    </div>
  );
}
