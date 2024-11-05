'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkFavorite, toggleFavorite } from '../likes';
import { getCurrentUser } from '../auth';

export default function FavoriteButton({ markerId }: { markerId: number }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: like } = useQuery({
    queryKey: ['current_user_like', markerId],
    queryFn: () => checkFavorite(markerId),
  });

  const { data: user } = useQuery({
    queryKey: ['current_user'],
    queryFn: getCurrentUser,
  });

  useEffect(() => {
    if (like?.length === 1) {
      setIsFavorite(true);
    }
  }, [like]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['current_user_like', markerId],
      });
    },
  });

  const handleToggleFavorite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    mutation.mutate({ markerId, userId: user.id, isFavorite });
    setIsFavorite(!isFavorite);
  };

  return (
    <Button
      variant="outline"
      onClick={handleToggleFavorite}
      disabled={mutation.isPending}
    >
      <Heart
        className={`h-4 w-4 mr-2 ${
          isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'
        }`}
      />
      {isFavorite ? (
        <span>お気に入りから削除</span>
      ) : (
        <span>お気に入りに追加</span>
      )}
    </Button>
  );
}
