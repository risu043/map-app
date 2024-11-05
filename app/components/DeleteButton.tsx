'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMarker } from '../marker';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function DeleteButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const deleteMarkerMutation = useMutation({
    mutationFn: () => deleteMarker(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fetchMarkers'],
      });
      alert('施設をリストから削除しました');
      router.push('/lists');
    },
  });
  return (
    <Button
      variant="outline"
      onClick={() => deleteMarkerMutation.mutate()}
      aria-label="削除する"
    >
      <Trash2 className="mr-2 h-4 w-4" />
      削除する
    </Button>
  );
}
