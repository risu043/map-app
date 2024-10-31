import { fetchMarkers } from '../../marker';
import MarkerDetails from '../../components/MarkerDetails';
import Posts from '@/app/components/Posts';
import PostForm from '@/app/components/PostForm';

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
      <div className="w-full max-w-3xl mx-auto">
        <MarkerDetails markerId={markerId} />
        <h3 className="mt-8 mb-2">みんなのレビュー</h3>
        <Posts markerId={markerId} />
        <PostForm markerId={markerId} />
      </div>
    </>
  );
}
