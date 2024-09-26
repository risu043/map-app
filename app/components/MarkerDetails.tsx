'use client';

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { fetchMarker } from '../marker';

const client = new QueryClient();

export default function MarkerDetails({ markerId }: { markerId: number }) {
  return (
    <QueryClientProvider client={client}>
      <MarkerListsPanel markerId={markerId} />
    </QueryClientProvider>
  );
}

function MarkerListsPanel({ markerId }: { markerId: number }) {
  const { data: marker, isLoading } = useQuery({
    queryKey: ['marker', markerId],
    queryFn: () => fetchMarker(markerId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!marker) {
    return <div>No markers found</div>;
  }

  return (
    <div>
      <div className="mb-8">施設名: {marker.title}</div>
      <div>
        <button className="text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          編集する
        </button>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          削除する
        </button>
      </div>
    </div>
  );
}
