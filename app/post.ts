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
    throw error;
  }

  return data || [];
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

export const deletePost = async (id: number): Promise<void> => {
  const { error } = await supabase.from('posts').delete().eq('id', id);

  if (error) {
    throw error;
  }
};

export const editPost = async ({
  id,
  title,
}: Database['public']['Tables']['posts']['Update']): Promise<void> => {
  const postId = Number(id);
  const { error } = await supabase
    .from('posts')
    .update({ title })
    .eq('id', postId);

  if (error) {
    throw error;
  }
};
