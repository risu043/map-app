'use client';

import React, { useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { fetchMarkers } from '../marker';

type FormattedMarker = {
  id: number;
  position: { lat: number; lng: number };
  title: string;
};

const GoogleMap = () => {
  const [markers, setMarkers] = useState<FormattedMarker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetMarkers = async () => {
      try {
        const fetchedMarkers = await fetchMarkers();
        if (Array.isArray(fetchedMarkers)) {
          const formattedMarkers = fetchedMarkers.map((marker) => ({
            id: marker.id,
            position: { lat: marker.lat, lng: marker.lng },
            title: marker.title,
          }));
          setMarkers(formattedMarkers);
        } else {
          console.error('Fetched markers is not an array:', fetchedMarkers);
          setMarkers([]);
        }
      } catch (error) {
        console.error('Error fetching markers:', error);
        setMarkers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetMarkers();
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

  if (!apiKey) {
    return <div>Google Maps API key is not set</div>;
  }

  const center = { lat: 35.658581, lng: 139.745433 };

  if (isLoading || markers.length === 0) {
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
          />
        ))}
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
