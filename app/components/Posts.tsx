'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { fetchPosts } from '../post';
import { getCurrentUser } from '../auth';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import DeletePostButton from './DeletePostButton';
import EditPostButton from './EditPostButton';

export default function Posts({ markerId }: { markerId: number }) {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', markerId],
    queryFn: () => fetchPosts(markerId),
  });

  const { data: user } = useQuery({
    queryKey: ['current_user'],
    queryFn: getCurrentUser,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Card className="mt-8">
        <CardContent className="p-6 text-center text-gray-500">
          レビューがまだありません
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>みんなのレビュー</CardTitle>
      </CardHeader>
      {posts.map((post) => {
        const profileImage =
          post.profiles.profile_image || '/images/default.png';
        return (
          <CardContent key={post.id} className="pr-0">
            <div className="flex gap-4 items-center mb-4">
              <Image
                src={`/images/${profileImage}`}
                alt={posts[0].profiles.name}
                priority
                width={80}
                height={80}
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <h3 className="text-lg font-semibold">{post.profiles.name}</h3>
              </div>
            </div>
            <p className="text-gray-700">{post.title}</p>
            {user?.id === post.userId && (
              <CardFooter className="flex justify-end items-end gap-4 mt-2">
                <EditPostButton
                  id={post.id}
                  title={post.title}
                  markerId={post.markerId}
                  userId={post.userId}
                />
                <DeletePostButton id={post.id} />
              </CardFooter>
            )}
          </CardContent>
        );
      })}
    </Card>
  );
}
