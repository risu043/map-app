'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import supabase from '../lib/supabase';

export default function UserProfileEdit() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string>('dfault.png');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setName(user.user_metadata.name || '');
        setEmail(user.email || '');
        setProfileImage(user.user_metadata.profile_image || 'dfault.png');
        setLoading(false);
      } else {
        router.push('/sign_in');
      }
    };
    getProfile();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center py-8 bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <CardDescription>user information</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Image
            src={`/images/${profileImage}`}
            alt="user_image"
            priority
            width={250}
            height={250}
            className="w-32 h-32 rounded-full object-cover border"
          />
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <p>{name}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <p>{email}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            onClick={() => router.push(`/profile/edit`)}
          >
            Update Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
