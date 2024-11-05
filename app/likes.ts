import supabase from './lib/supabase';
import { Database } from './types/supabase';

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

// export const createFavorite = async ({
//   id,
// }: Database['public']['Tables']['likes']['Insert']): Promise<void> => {
//   const markerid = Number(id);
//   const { error } = await supabase.from('likes').insert({ markerid });

//   if (error) {
//     throw error;
//   }
// };

// export const deleteFavorite = async (id: number): Promise<void> => {
//   const { error } = await supabase.from('likes').delete().eq('markerid', id);

//   if (error) {
//     throw error;
//   }
// };
// export const toggleFavorite = async ({
//   markerId,
//   isFavorite,
// }: {
//   markerId: number;
//   isFavorite: boolean;
// }) => {
//   if (isFavorite) {
//     await deleteFavorite(markerId);
//   } else {
//     await createFavorite(markerId);
//   }
// };
