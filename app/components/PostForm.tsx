'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createPost } from '../post';
import { getCurrentUser } from '../auth';

export default function PostForm({ markerId }: { markerId: number }) {
  const [title, setTitle] = useState('');

  const { data: user } = useQuery({
    queryKey: ['current_user'],
    queryFn: getCurrentUser,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', markerId] });
      setTitle('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    mutation.mutate({
      title,
      markerId,
      userId: user.id,
    });
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>新規投稿</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="レビューを入力してください"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full"
          >
            {mutation.isPending ? '投稿中...' : '投稿する'}
          </Button>
          {mutation.isError && (
            <p className="text-red-500 text-sm">{mutation.error.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
