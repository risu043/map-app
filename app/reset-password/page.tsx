'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resetPassword } from '../auth';

export default function StaticPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSend, setIsSend] = useState<boolean>(false);

  const resetPasswordMutation = useMutation({
    mutationFn: () => resetPassword(password),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['current_user'],
      });
      setIsSend(true);
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPasswordMutation.mutate();
  };

  if (isSend) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>パスワードが更新されました</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              パスワードが正常に更新されました。新しいパスワードでログインできます。
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push('/sign_in')} className="w-full">
            ログイン画面へ
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          安全な新しいパスワードを入力してください。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">新規パスワード</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">
            パスワードを更新
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          onClick={() => router.push('/sign_in')}
          className="w-full"
        >
          ログイン画面へ戻る
        </Button>
      </CardFooter>
    </Card>
  );
}
