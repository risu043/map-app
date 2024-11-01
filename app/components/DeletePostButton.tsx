'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../post';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function DeletePostButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const deletePostMutation = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
      alert('レビューを削除しました');
    },
  });
  return (
    <Button
      variant="outline"
      onClick={() => deletePostMutation.mutate()}
      aria-label="削除する"
    >
      <Trash2 className="mr-2 h-4 w-4" />
      削除する
    </Button>
  );
}
