'use client';

import React from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const GoogleMap = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

  if (!apiKey) {
    return <div>Google Maps API key is not set</div>;
  }

  const center = { lat: 35.658581, lng: 139.745433 };

  const markers = [
    { position: { lat: 35.658581, lng: 139.745433 }, title: '東京タワー' },
    { position: { lat: 35.710015, lng: 139.810759 }, title: 'スカイツリー' },
  ];

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
        {markers.map((marker, index) => (
          <AdvancedMarker
            key={index}
            position={marker.position}
            title={marker.title}
          />
        ))}
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
