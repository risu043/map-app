'use client';

import React from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchMarkers } from '../marker';
import { Marker } from '@prisma/client';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, MapPin, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
      <Card className="w-full h-[700px] flex justify-center items-center">
        <CardContent className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium text-muted-foreground">
            Loading map...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'An error occurred'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!markers || markers.length === 0) {
    return (
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>No Markers</AlertTitle>
        <AlertDescription>No markers found on the map</AlertDescription>
      </Alert>
    );
  }

  const handleMarkerClick = (id: number) => {
    router.push(`/lists/${id}`);
  };

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        style={{ width: '100%', height: '100%' }}
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
