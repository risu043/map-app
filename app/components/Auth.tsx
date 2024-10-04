'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { getCurrentUser, signOut } from '../auth';
import { useRouter } from 'next/navigation';

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
      <div className="flex gap-4">
        <Link href="/sign_up">新規登録</Link>
        <Link href="/sign_in">ログイン</Link>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {user.email}
      <button onClick={() => signOutMutation.mutate()}>ログアウト</button>
    </div>
  );
}
