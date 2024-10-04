'use client';

import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editMarker } from '../marker';
import { useRouter } from 'next/navigation';
import GoogleMapSingle from './GoogleMapSingle';
import { fetchMarker } from '../marker';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import supabase from '../lib/supabase';
import { SingleMarker } from '../types';

export default function EditForm({ markerId }: { markerId: number }) {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [targetMarker, setTargetMarker] = useState<SingleMarker>(null);
  const [previewImage, setPreviewImage] = useState('');

  const { data: marker, isLoading } = useQuery({
    queryKey: ['marker', markerId],
    queryFn: () => fetchMarker(markerId),
  });
  useEffect(() => {
    if (marker) {
      setAddress(marker.title);
      setMessage(marker.message);
      setCategory(marker.category);
      const newImage = marker.image;
      setPreviewImage(newImage);
      setImage(newImage);
      setTargetMarker({
        title: marker.title,
        position: { lat: marker.lat, lng: marker.lng },
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

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length == 0) {
      // 画像が選択されていないのでreturn
      return;
    }
    setIsUploading(true);
    const file = event.target.files[0];
    const previewImageUrl = URL.createObjectURL(file);
    setPreviewImage(previewImageUrl);
    const filePath = `public/${file.name}`; // 画像の保存先のpathを指定
    const { error } = await supabase.storage
      .from('my-bucket')
      .upload(filePath, file);
    if (error) {
      console.error('Error uploading file:', error);
    }

    // 画像のURLを取得
    const { data } = supabase.storage.from('my-bucket').getPublicUrl(filePath);
    // 画像のURLをDBに保存
    setImage(data.publicUrl);
    setIsUploading(false);
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
        queryKey: ['marker', 'fetchMarkers'],
      });
      alert('施設施設を編集しました');
      router.push('/lists');
    },
  });

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

      <div>
        <div className="mb-4">
          <GoogleMapSingle
            marker={{
              title: targetMarker.title,
              position: targetMarker.position,
            }}
          />
        </div>
        <form
          encType="multipart/form-data"
          onSubmit={() => editMarkerMutation.mutate()}
        >
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
              <option value="sample1">sample1</option>
              <option value="sample2">sample1</option>
              <option value="sample3">sample1</option>
            </select>
          </div>
          <div className="mb-4">
            {isUploading ? (
              <div className="relative mb-4 w-80 border">
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={200}
                  height={150}
                  className="relative z-10"
                />
                <div className="absolute inset-0 bg-black opacity-50 z-20 flex justify-center items-center">
                  <div className="loader" />
                </div>
              </div>
            ) : (
              <div className="mb-4 w-80 border">
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={200}
                  height={150}
                  priority
                />
              </div>
            )}
            <input type="file" onChange={handleImageChange} />
          </div>
          <button
            disabled={isUploading}
            className={`bg-rose-400 text-white px-8 py-4 rounded-full my-8 ${
              isUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            編集内容を登録する
          </button>
        </form>
      </div>
    </>
  );
}
