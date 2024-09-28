'use client';

import React from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchMarkers } from '../marker';
import { FormattedMarker } from '../types';

const GoogleMap = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    data: markers,
    isLoading,
    isError,
    error,
  } = useQuery<FormattedMarker[], Error>({
    queryKey: ['fetchMarkers'],
    queryFn: fetchMarkers,
    initialData: queryClient.getQueryData(['fetchMarkers']),
  });

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

  if (!apiKey) {
    return <div>Google Maps API key is not set</div>;
  }

  const center = { lat: 35.681236, lng: 139.767124 };

  if (isLoading) {
    return (
      <div
        style={{
          width: '800px',
          height: '700px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Loading map...
      </div>
    );
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

  const handleMarkerClick = (id: number) => {
    router.push(`/lists/${id}`);
  };

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        style={{ width: '800px', height: '700px' }}
        defaultCenter={center}
        defaultZoom={13}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={mapId}
      >
        {markers.map((marker) => (
          <AdvancedMarker
            key={marker.id}
            position={marker.position}
            title={marker.title}
            onClick={() => handleMarkerClick(marker.id)}
          />
        ))}
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
