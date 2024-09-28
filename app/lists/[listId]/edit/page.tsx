import EditForm from '@/app/components/EditForm';
import { fetchMarkers } from '../../../marker';

export async function generateStaticParams() {
  try {
    const markers = await fetchMarkers();
    if (!markers || markers.length === 0) {
      console.error('Markers is undefined');
      return [];
    }

    return markers.map((marker) => ({
      listId: marker.id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching markers for static params:', error);
    return [];
  }
}

export default async function StaticDetailPage({
  params: { listId },
}: {
  params: { listId: string };
}) {
  const markerId = parseInt(listId, 10);

  return (
    <>
      <EditForm markerId={markerId} />
    </>
  );
}
