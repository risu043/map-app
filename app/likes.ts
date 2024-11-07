import supabase from './lib/supabase';
import { Database } from './types/supabase';
import { PostgrestResponse } from '@supabase/supabase-js';

export async function checkFavorite(id: number) {
  const { data, error } = await supabase
    .from('likes')
    .select()
    .eq('markerid', id);

  if (error) {
    throw error;
  }

  return data || [];
}

export const createFavorite = async ({
  userid,
  markerid,
}: Database['public']['Tables']['likes']['Insert']): Promise<void> => {
  const { error } = await supabase.from('likes').insert({
    userid,
    markerid,
  });

  if (error) {
    throw error;
  }
};

export const deleteFavorite = async (id: number): Promise<void> => {
  const { error } = await supabase.from('likes').delete().eq('markerid', id);

  if (error) {
    throw error;
  }
};

export const toggleFavorite = async ({
  markerId,
  userId,
  isFavorite,
}: {
  markerId: number;
  userId: string;
  isFavorite: boolean;
}) => {
  if (isFavorite) {
    await deleteFavorite(markerId);
  } else {
    await createFavorite({ markerid: markerId, userid: userId });
  }
};

type Marker = {
  title: string;
  image: string;
};

type FavoriteMarker = {
  id: number;
  userid: string;
  markerid: number;
  created_at: string;
  markers: Marker;
};

export async function fetchFavoriteMarkers(): Promise<FavoriteMarker[]> {
  const { data, error } = (await supabase.from('likes').select(
    `
    *,
    markers:markerid (
    title,
    image
    )
    `
  )) as PostgrestResponse<FavoriteMarker>;

  if (error) {
    console.error('Error fetching favorite markers:', error);
    throw error;
  }

  return data || [];
}
