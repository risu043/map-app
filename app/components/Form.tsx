'use client';

import React, { useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { addMarker } from '../marker';
import { useRouter } from 'next/navigation';
import GoogleMapSingle from './GoogleMapSingle';

type SingleMarker = {
  title: string;
  position: { lat: number; lng: number };
} | null;

export default function Form() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState('');
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [marker, setMarker] = useState<SingleMarker>(null);
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

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
        setResult('');
        setMarker({
          title: address,
          position: { lat: location.lat(), lng: location.lng() },
        });
      } else {
        setResult('施設が見つかりませんでした。');
        setCenter(null);
        setMarkerPosition(null);
      }
    });
  };

  const handleRegister = async () => {
    if (markerPosition && address) {
      try {
        const newMarker = await addMarker({
          lat: markerPosition.lat,
          lng: markerPosition.lng,
          title: address,
          message: message,
          category: category,
          image: image,
        });
        if (newMarker) {
          alert('施設が正常に登録されました。');
          router.push('/lists');
        }
      } catch (error) {
        console.error('施設の登録中にエラーが発生しました:', error);
        alert('施設の登録中にエラーが発生しました。');
      }
    }
  };

  if (!apiKey) {
    return <div>Google Maps API key is not set</div>;
  }

  return (
    <>
      <div className="mb-4">登録フォーム</div>
      <form onSubmit={handleSubmit} className="mb-4">
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
      {result && <div className="mb-4">{result}</div>}
      <APIProvider apiKey={apiKey}>
        {center && (
          <div>
            <div className="mb-4">
              <GoogleMapSingle marker={marker} />
            </div>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="メッセージ"
                  className="border p-4"
                />
              </div>
              <div className="mb-4">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border p-4"
                >
                  <option value="">Select a category</option>
                  <option value="electronics">公園</option>
                  <option value="clothing">こども向け</option>
                  <option value="books">飲食店</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="image"
                  className="border p-4"
                />
              </div>
              <button className="bg-rose-400 text-white px-8 py-4 rounded-full mt-8">
                この施設を登録する
              </button>
            </form>
          </div>
        )}
      </APIProvider>
    </>
  );
}
