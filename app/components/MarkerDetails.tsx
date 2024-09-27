'use client';

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { fetchMarker } from '../marker';
import DeleteButton from './DeleteButton';
import GoogleMapSingle from './GoogleMapSingle';
import { useEffect, useState } from 'react';

const client = new QueryClient();

type SingleMarker = {
  title: string;
  position: { lat: number; lng: number };
} | null;

export default function MarkerDetails({ markerId }: { markerId: number }) {
  return (
    <QueryClientProvider client={client}>
      <MarkerListsPanel markerId={markerId} />
    </QueryClientProvider>
  );
}

function MarkerListsPanel({ markerId }: { markerId: number }) {
  const [targetMarker, setTargetMarker] = useState<SingleMarker>(null);
  const { data: marker, isLoading } = useQuery({
    queryKey: ['marker', markerId],
    queryFn: () => fetchMarker(markerId),
  });

  useEffect(() => {
    if (marker) {
      setTargetMarker({
        title: marker.title,
        position: { lat: marker.lat, lng: marker.lng },
      });
    }
  }, [marker]);

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
        <GoogleMapSingle marker={targetMarker} />
      </div>
      <div>
        <EditButton />
        <DeleteButton id={marker.id} />
      </div>
    </div>
  );
}

function EditButton() {
  return (
    <button className="text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      編集する
    </button>
  );
}
