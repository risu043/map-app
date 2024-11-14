'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import supabase from '../lib/supabase';

type ProfileImage = {
  value: string;
  label: string;
};

export default function UserProfileEdit() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState<ProfileImage>({
    value: 'default.png',
    label: 'Default',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const profileImages: ProfileImage[] = [
    { value: 'squirrel.png', label: 'Squirrel' },
    { value: 'cat.png', label: 'Cat' },
    { value: 'rabbit.png', label: 'Rabbit' },
    { value: 'fish.png', label: 'Fish' },
  ];

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setName(user.user_metadata.name || '');
        setEmail(user.new_email || user.email || '');
        setProfileImage(
          user.user_metadata.profile_image || {
            value: 'default.png',
            label: 'Default',
          }
        );
        setLoading(false);
      } else {
        router.push('/sign_in');
      }
    };
    getProfile();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const updates = {
      data: {
        ...(name && { name }),
        profile_image: profileImage.value,
      },
      ...(email && { email }),
    };

    const { error: updateError } = await supabase.auth.updateUser(updates);

    if (updateError) {
      setMessage(`Error updating profile: ${updateError.message}`);
    } else {
      setMessage('Profile updated successfully!');
    }

    if (password) {
      const { error: passwordError } = await supabase.auth.updateUser({
        password,
      });
      if (passwordError) {
        setMessage(
          (prev) => `${prev} Error updating password: ${passwordError.message}`
        );
      } else {
        setMessage((prev) => `${prev} Password updated successfully!`);
      }
    }

    setLoading(false);
  };

  const handleProfileImageChange = (value: string) => {
    const selectedImage = profileImages.find((img) => img.value === value);
    if (selectedImage) {
      setProfileImage(selectedImage);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center py-8 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
          <CardDescription>Update your user information</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                New Password (leave blank to keep current)
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Profile Image</Label>
              <RadioGroup
                value={profileImage.value}
                onValueChange={handleProfileImageChange}
                className="grid grid-cols-2 gap-4"
              >
                {profileImages.map((image) => (
                  <div
                    key={image.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={image.value} id={image.value} />
                    <Label htmlFor={image.value} className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <img
                          src={`/images/${image.value}`}
                          alt={image.label}
                          className="w-24 h-24 object-cover rounded-lg mb-2"
                        />
                        <span>{image.label}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            {message && (
              <Alert
                variant={message.includes('Error') ? 'destructive' : 'default'}
              >
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
