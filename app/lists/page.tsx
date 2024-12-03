import MarkerLists from '../components/MarkerLists';
import Search from '../components/Search';
import { Suspense } from 'react';

export default async function StaticPage(props: {
  searchParams?: Promise<{
    filter?: string;
    category?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const filter = searchParams?.filter || '';
  const category = searchParams?.category || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <Search />
      <Suspense key={filter + currentPage} fallback={<div>loading...</div>}>
        <MarkerLists filter={filter} category={category} page={currentPage} />
      </Suspense>
    </div>
  );
}
