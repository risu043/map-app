'use client';

import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

export default function Form() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState('');
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!window.google) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const location = results[0].geometry.location;
        const latLng = { lat: location.lat(), lng: location.lng() };
        setCenter(latLng);
        setMarkerPosition(latLng);
        setResult(`緯度: ${location.lat()}, 経度: ${location.lng()}`);
      } else {
        setResult('施設が見つかりませんでした。');
        setCenter(null);
        setMarkerPosition(null);
      }
    });
  };

  if (!apiKey) {
    return <div>Google Maps API key is not set</div>;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="住所または施設名を入力"
          className="border p-4"
        />
        <input
          type="submit"
          value="検索"
          className="bg-gray-200 p-4 cursor-pointer"
        />
      </form>
      {result && <div className="mt-4">{result}</div>}
      {/* Google Map with marker */}
      {center && (
        <div>
          <div className="mt-4">
            <Map
              center={center}
              mapId={mapId}
              zoom={13}
              style={{ width: '400px', height: '300px' }}
            >
              {markerPosition && <AdvancedMarker position={markerPosition} />}
            </Map>
          </div>
          <button className="bg-rose-400 text-white px-8 py-4 rounded-full mt-8">
            この施設を登録する
          </button>
        </div>
      )}
    </APIProvider>
  );
}
