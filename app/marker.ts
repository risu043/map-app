import { Marker } from '@prisma/client';

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

export const deleteMarker = async (id: Marker['id']) => {
  try {
    const res = await fetch(`/api/markers/${id}`, { method: 'DELETE' });
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.error('マーカーの削除に失敗しました:', error);
  }
};

type SearchMarker = Marker & { _count: { posts: number } };

export const searchMarkers = async () => {
  try {
    const res = await fetch('/api/search');
    if (!res.ok) {
      throw new Error(`Failed to fetch markers: ${res.status}`);
    }

    const data: SearchMarker[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error in fetchMarkers:', error);
    throw error;
  }
};
