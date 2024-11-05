'use client';

import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { editMarker, fetchMarker } from '../marker';
import { useRouter } from 'next/navigation';
import GoogleMapSingle from './GoogleMapSingle';
import Image from 'next/image';
import supabase from '../lib/supabase';
import { SingleMarker } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Search, Upload, Edit } from 'lucide-react';
import { APIProvider } from '@vis.gl/react-google-maps';

export default function EditForm({ markerId }: { markerId: number }) {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [targetMarker, setTargetMarker] = useState<SingleMarker>(null);
  const [previewImage, setPreviewImage] = useState('');
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

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
        queryKey: ['fetchMarkers'],
      });
      alert('施設を編集しました');
      router.push('/lists');
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!targetMarker) {
    return (
      <Alert variant="destructive">
        <AlertDescription>マーカーが見つかりません</AlertDescription>
      </Alert>
    );
  }

  if (!apiKey) {
    return <div>Google Maps API key is not set</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">施設編集フォーム</CardTitle>
        <CardDescription>施設情報を編集します</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="住所または施設名を入力"
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              検索
            </Button>
          </div>
        </form>
        {result && (
          <Alert variant="destructive">
            <AlertDescription>{result}</AlertDescription>
          </Alert>
        )}
        <div className="h-64 w-full">
          <APIProvider apiKey={apiKey}>
            <GoogleMapSingle marker={targetMarker} />
          </APIProvider>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editMarkerMutation.mutate();
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="message">メッセージ</Label>
            <Input
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="施設に関するメッセージを入力"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">カテゴリー</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="カテゴリーを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="観光">観光</SelectItem>
                <SelectItem value="食事">食事</SelectItem>
                <SelectItem value="家族">家族</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">画像</Label>
            <div className="flex items-center space-x-4">
              <div className="relative w-40 h-30 border">
                {isUploading ? (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                  </div>
                ) : null}
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={200}
                  height={150}
                  className="z-10"
                />
              </div>
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md">
                  <Upload className="h-4 w-4" />
                  <span>画像をアップロード</span>
                </div>
                <Input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </Label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isUploading || editMarkerMutation.isPending}
          >
            <Edit className="mr-2 h-4 w-4" />
            {editMarkerMutation.isPending ? '編集中...' : '編集内容を登録する'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
