'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { fetchMarker } from '../marker';
import DeleteButton from './DeleteButton';
import GoogleMapSingle from './GoogleMapSingle';
import EditButton from './EditButton';
import { getCurrentUser } from '../auth';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Mail, Pencil, Tag, Trash2 } from 'lucide-react';
import AuthButton from './AuthButton';
import FavoriteButton from './FavoriteButton';

export default function MarkerDetails({ markerId }: { markerId: number }) {
  const { data: marker, isLoading } = useQuery({
    queryKey: ['marker', markerId],
    queryFn: () => fetchMarker(markerId),
  });

  const { data: user } = useQuery({
    queryKey: ['current_user'],
    queryFn: getCurrentUser,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-8">
          <Skeleton className="h-64 md:h-96 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!marker) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No markers found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{marker.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="relative h-64 md:h-96 w-full rounded-lg">
          <Image
            src={marker.image}
            alt={marker.title}
            layout="fill"
            objectFit="cover"
            priority
            className="rounded-lg"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">カテゴリー:</span>
            <Badge variant="secondary">{marker.category}</Badge>
          </div>
          <div className="flex items-start space-x-2">
            <Mail className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <span className="font-medium">メッセージ:</span>
              <p className="text-muted-foreground">{marker.message}</p>
            </div>
          </div>
        </div>
        <div className="h-64 w-full rounded-lg overflow-hidden">
          <GoogleMapSingle
            marker={{
              title: marker.title,
              position: { lat: marker.lat, lng: marker.lng },
            }}
          />
        </div>
      </CardContent>
      {user ? (
        <CardFooter className="flex justify-end items-end gap-4 md:flex-row flex-col">
          <FavoriteButton markerId={marker.id} />
          <div className="flex justify-end gap-4">
            <EditButton id={marker.id} />
            <DeleteButton id={marker.id} />
          </div>
        </CardFooter>
      ) : (
        <CardFooter className="flex justify-end gap-4">
          <AuthButton variant="default">
            <Pencil className="mr-2 h-4 w-4" />
            編集する
          </AuthButton>
          <AuthButton variant="outline">
            <Trash2 className="mr-2 h-4 w-4" />
            削除する
          </AuthButton>
        </CardFooter>
      )}
    </Card>
  );
}
