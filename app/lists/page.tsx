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
    staleTime: 0,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <MarkerLists />
      </HydrationBoundary>
    </>
  );
}
