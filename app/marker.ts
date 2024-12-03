import { Marker } from '@prisma/client';
import supabase from './lib/supabase';

export const fetchMarkers = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/markers`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch markers: ${res.status}`);
    }

    const data: Marker[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error in fetchMarkers:', error);
    throw error;
  }
};

export const fetchMarker = async (id: Marker['id']) => {
  try {
    const res = await fetch(`/api/markers/${id}`);
    const data: Marker = await res.json();

    return data;
  } catch (error) {
    console.error('マーカーの取得に失敗しました:', error);
  }
};

export const addMarker = async ({
  lat,
  lng,
  title,
  category,
  message,
  image,
}: Omit<Marker, 'id'>): Promise<Marker> => {
  try {
    const res = await fetch('/api/markers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng, title, category, message, image }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const newMarker: Marker = await res.json();
    return newMarker;
  } catch (error) {
    console.error('マーカーの追加に失敗しました:', error);
    throw error;
  }
};

export const editMarker = async ({
  id,
  lat,
  lng,
  title,
  category,
  message,
  image,
}: Marker) => {
  try {
    const res = await fetch(`/api/markers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng, title, category, message, image }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const newMarker: Marker = await res.json();
    return newMarker;
  } catch (error) {
    console.error('マーカーの編集に失敗しました:', error);
  }
};

// export const deleteMarker = async (id: Marker['id']) => {
//   try {
//     const res = await fetch(`/api/markers/${id}`, { method: 'DELETE' });
//     if (res.ok) {
//       return res.json();
//     }
//   } catch (error) {
//     console.error('マーカーの削除に失敗しました:', error);
//   }
// };

export const deleteMarker = async (id: number): Promise<void> => {
  const { error } = await supabase.from('markers').delete().eq('id', id);

  if (error) {
    throw error;
  }
};

type SearchResponse = {
  markers: (Marker & {
    _count: {
      posts: number;
    };
  })[];
  hitCount: number;
};

// export const searchMarkers = async ({
//   page,
//   filter,
//   category,
// }: {
//   page: number;
//   filter: string;
//   category: string;
// }) => {
//   try {
//     const res = await fetch(
//       `/api/search?page=${page}&filter=${filter}&category=${category}`
//     );
//     if (!res.ok) {
//       throw new Error(`Failed to fetch markers: ${res.status}`);
//     }

//     const data: SearchResponse = await res.json();
//     return data;
//   } catch (error) {
//     console.error('Error in fetchMarkers:', error);
//     throw error;
//   }
// };

export const searchMarkers = async ({
  page,
  filter,
  category,
}: {
  page: number;
  filter: string;
  category: string;
}) => {
  try {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page, filter, category }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch markers: ${res.status}`);
    }

    const data: SearchResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error in searchMarkers:', error);
    throw error;
  }
};
