'use client';

import React from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchMarkers } from '../marker';
import { Marker } from '@prisma/client';

const GoogleMap = () => {
  const router = useRouter();
  const {
    data: markers,
    isLoading,
    isError,
    error,
  } = useQuery<Marker[], Error>({
    queryKey: ['fetchMarkers'],
    queryFn: fetchMarkers,
  });

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

  if (!apiKey) {
    return <div>Google Maps API key is not set</div>;
  }

  const center = { lat: 26.4975957, lng: 127.8529654 };

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

  if (!markers) {
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
        defaultZoom={10}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={mapId}
      >
        {markers.map((marker) => (
          <AdvancedMarker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.title}
            onClick={() => handleMarkerClick(marker.id)}
          >
            <div className="bg-white border-4 border-indigo-700 w-20 h-20 rounded-full overflow-hidden relative">
              <img
                src={marker.image}
                alt={marker.title}
                className="w-full h-full object-cover absolute top-0 left-0"
              />
            </div>
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
