import { Marker } from '@prisma/client';
import { FormattedMarker } from './types';

export const fetchMarkers = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/markers');
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
    const marker: Marker = await res.json();
    const formattedMarker: FormattedMarker = {
      id: marker.id,
      position: { lat: marker.lat, lng: marker.lng },
      title: marker.title,
      category: marker.category,
      image: marker.image,
      message: marker.message,
    };
    return formattedMarker;
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
