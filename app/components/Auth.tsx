'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { getCurrentUser, signOut } from '../auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';

export default function Auth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['current_user'],
    queryFn: getCurrentUser,
  });

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['current_user'],
      });
      router.push('/');
    },
  });

  if (!user) {
    return (
      <div>
        <Button variant="default" size="sm" asChild>
          <Link href="/sign_in">
            <LogIn className="mr-2 h-4 w-4" />
            sign in
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOutMutation.mutate()}
      >
        <LogOut className="mr-2 h-4 w-4" />
        sign out
      </Button>
    </div>
  );
}
