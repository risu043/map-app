import supabase from './lib/supabase';
import { PostgrestResponse } from '@supabase/supabase-js';
import { Database } from './types/supabase';

type Profile = {
  id: string;
  name: string;
  email: string | null;
  profile_image: string | null;
};

type PostWithProfile = {
  createdAt: string;
  id: number;
  markerId: number;
  title: string;
  updatedAt: string;
  userId: string;
  profiles: Profile;
};

export const fetchPosts = async (id: number): Promise<PostWithProfile[]> => {
  try {
    const { data, error } = (await supabase
      .from('posts')
      .select(
        `
        *,
        profiles:userId (
          id,
          name,
          email,
          profile_image
        )
      `
      )
      .eq('markerId', id)) as PostgrestResponse<PostWithProfile>;

    if (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchPosts:', error);
    throw error;
  }
};

export const createPost = async ({
  title,
  markerId,
  userId,
}: Database['public']['Tables']['posts']['Insert']): Promise<void> => {
  const { error } = await supabase.from('posts').insert({
    title,
    markerId,
    userId,
  });

  if (error) {
    throw error;
  }
};
