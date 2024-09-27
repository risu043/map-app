import { Marker } from '@prisma/client';

export const fetchMarkers = async () => {
  try {
    const res = await fetch('/api/markers');
    const data: Marker[] = await res.json();
    return data;
  } catch (error) {
    console.error('マーカーの取得に失敗しました:', error);
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
}: Omit<Marker, 'id'>): Promise<Marker> => {
  try {
    const res = await fetch('/api/markers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng, title }),
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

export const editMarker = async ({ id, lat, lng, title }: Marker) => {
  try {
    const res = await fetch(`/api/markers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng, title }),
    });
    if (res.ok) {
      const newMarker: Marker = await res.json();
      return newMarker;
    }
  } catch (error) {
    console.error('マーカーの切り替えに失敗しました:', error);
  }
};

export const deleteMarker = async (id: Marker['id']) => {
  try {
    const res = await fetch(`/api/markers/${id}`, { method: 'DELETE' });
    if (res.ok) {
      return;
    }
  } catch (error) {
    console.error('マーカーの削除に失敗しました:', error);
  }
};
