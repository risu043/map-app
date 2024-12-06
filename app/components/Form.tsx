'use client';

import React, { useState } from 'react';
import { addMarker } from '../marker';
import { useRouter } from 'next/navigation';
import GoogleMapSingle from './GoogleMapSingle';
import { SingleMarker } from '../types';
import { APIProvider } from '@vis.gl/react-google-maps';
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
import { Search, PlusCircle } from 'lucide-react';
import AuthButton from './AuthButton';
import { getCurrentUser } from '../auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function Form() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState('');
  const [marker, setMarker] = useState<SingleMarker>(null);
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  const { data: user } = useQuery({
    queryKey: ['current_user'],
    queryFn: getCurrentUser,
  });

  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!window.google) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const location = results[0].geometry.location;
        setMarker({
          title: address,
          position: { lat: location.lat(), lng: location.lng() },
        });
        setResult('');
      } else {
        setResult('施設が見つかりませんでした。');
      }
    });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (marker && address) {
      try {
        const newMarker = await addMarker({
          lat: marker.position.lat,
          lng: marker.position.lng,
          title: address,
          message: message,
          category: category,
          image: '/images/noimage.jpg',
        });
        if (newMarker) {
          await queryClient.invalidateQueries({
            queryKey: ['fetchMarkers'],
          });
          await queryClient.invalidateQueries({
            queryKey: ['searchMarkers'],
          });
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
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">施設登録フォーム</CardTitle>
          <CardDescription>新しい施設を検索して登録します</CardDescription>
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
          <div className="w-full h-80">
            <APIProvider apiKey={apiKey}>
              <GoogleMapSingle marker={marker} />
            </APIProvider>
          </div>
          <form onSubmit={handleRegister} className="space-y-4">
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
            {user ? (
              <Button
                type="submit"
                className="w-full"
                disabled={!marker || !address}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                この施設を登録する
              </Button>
            ) : (
              <AuthButton variant="default" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                この施設を登録する
              </AuthButton>
            )}
          </form>
        </CardContent>
      </Card>
    </>
  );
}
