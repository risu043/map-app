'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

export default function EditButton({ id }: { id: number }) {
  const router = useRouter();
  return (
    <Button
      variant="default"
      onClick={() => router.push(`/lists/${id}/edit`)}
      aria-label="編集する"
    >
      <Pencil className="mr-2 h-4 w-4" />
      編集する
    </Button>
  );
}
