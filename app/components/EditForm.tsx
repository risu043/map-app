'use client';

import React, { useEffect, useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editMarker } from '../marker';
import { useRouter } from 'next/navigation';
import GoogleMapSingle from './GoogleMapSingle';
import { fetchMarker } from '../marker';
import { useQuery } from '@tanstack/react-query';

type SingleMarker = {
  title: string;
  position: { lat: number; lng: number };
} | null;

export default function EditForm({ markerId }: { markerId: number }) {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const [targetMarker, setTargetMarker] = useState<SingleMarker>(null);

  const { data: marker, isLoading } = useQuery({
    queryKey: ['marker', markerId],
    queryFn: () => fetchMarker(markerId),
  });
  useEffect(() => {
    if (marker) {
      setAddress(marker.title);
      setMessage(marker.message);
      setCategory(marker.category);
      setImage(marker.image);
      setTargetMarker({
        title: marker.title,
        position: marker.position,
      });
    }
  }, [marker]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!window.google) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const location = results[0].geometry.location;
        setTargetMarker({
          title: address,
          position: { lat: location.lat(), lng: location.lng() },
        });
        setResult('');
      } else {
        setResult('施設が見つかりませんでした。');
      }
    });
  };

  const queryClient = useQueryClient();
  const router = useRouter();
  const editMarkerMutation = useMutation({
    mutationFn: () => {
      if (targetMarker?.position) {
        return editMarker({
          id: markerId,
          lat: targetMarker.position.lat,
          lng: targetMarker.position.lng,
          title: address,
          message: message,
          category: category,
          image: image,
        });
      }
      throw new Error('ターゲットマーカーが設定されていません');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['marker'],
      });
      alert('施設施設を編集しました');
      router.push('/lists');
    },
  });

  if (!apiKey) {
    return <div>Google Maps API key is not set</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!targetMarker) {
    return <div>No markers found</div>;
  }

  return (
    <>
      <div className="mb-4">編集フォーム</div>
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
        <div>
          <div className="mb-4">
            <GoogleMapSingle marker={targetMarker} />
          </div>
          <form onSubmit={() => editMarkerMutation.mutate()}>
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
              編集内容を登録する
            </button>
          </form>
        </div>
      </APIProvider>
    </>
  );
}
