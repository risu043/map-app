import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import GoogleMap from './components/GoogleMap';
import { fetchMarkers } from './marker';

export default async function StaticPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['fetchMarkers'],
    queryFn: fetchMarkers,
    staleTime: 5 * 60 * 1000,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <div className="w-full h-[80vh]">
          <GoogleMap />
        </div>
      </HydrationBoundary>
    </div>
  );
}
