import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchMarkers } from './../marker';
import MarkerLists from '../components/MarkerLists';

export default async function StaticPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['fetchMarkers'],
    queryFn: fetchMarkers,
    staleTime: 5 * 60 * 1000,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="container max-w-6xl mx-auto py-8">
      <HydrationBoundary state={dehydratedState}>
        <MarkerLists />
      </HydrationBoundary>
    </div>
  );
}
