'use client';

import React from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

type SingleMarker = {
  title: string;
  position: { lat: number; lng: number };
} | null;

function GoogleMapSingle({ marker }: { marker: SingleMarker }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

  if (!apiKey) {
    return <div>Google Maps API key is not set</div>;
  }

  if (!marker) {
    return (
      <div className="w-[400px] h-[300px] border grid items-center">
        <p className="text-center">No marker data available</p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        style={{ width: '400px', height: '300px' }}
        center={marker.position}
        defaultZoom={13}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={mapId}
      >
        <AdvancedMarker position={marker.position} title={marker.title} />
      </Map>
    </APIProvider>
  );
}

export default GoogleMapSingle;
