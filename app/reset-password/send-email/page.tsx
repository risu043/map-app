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
import { Mail } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendEmail } from '@/app/auth';

export default function StaticPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSend, setIsSend] = useState<boolean>(false);

  const sendEmailMutation = useMutation({
    mutationFn: () => sendEmail(email),
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
    sendEmailMutation.mutate();
  };

  if (isSend) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>メールを送信しました</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              パスワードリセットの手順をメールでお送りしました。メールをご確認ください。
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push('/sign_in')} className="w-full">
            ログイン画面へ戻る
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
          パスワードをリセットするためのメールを送信します。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">
            リセットメールを送信
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
