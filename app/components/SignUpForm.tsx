'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../auth';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const queryClient = useQueryClient();

  const signUpMutation = useMutation({
    mutationFn: () => signUp(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['current_user'],
      });
      router.push('/');
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpMutation.mutate();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col w-96 m-auto gap-y-8"
      >
        <div className="flex flex-col">
          <label className="text-lg">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-slate-300"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 7
            className="p-2 border border-slate-300"
          />
        </div>
        {errorMessage && <div className="text-red-400">{errorMessage}</div>}
        <button type="submit" className="p-2 text-white bg-violet-600">
          Sign up
        </button>
        <div className="flex justify-end">
          <Link href="/sign_in">Go to sign in page</Link>
        </div>
      </form>
    </div>
  );
}
