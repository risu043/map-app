'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  page: number;
  filter: string;
  category: string;
  hitCount: number;
};

export default function Pagination({
  page,
  filter,
  category,
  hitCount,
}: PaginationProps): JSX.Element {
  const router = useRouter();
  const pageVolume = 3;
  const isLast = hitCount <= page * pageVolume;
  const totalPages = Math.ceil(hitCount / pageVolume);

  const createHref = (newPage: number) => {
    const params = new URLSearchParams();

    params.set('page', String(newPage));

    if (filter) {
      params.set('filter', filter);
    }

    if (category) {
      params.set('category', category);
    }

    return `?${params.toString()}`;
  };

  const handlePrevPageClick = (): void => {
    router.push(createHref(page - 1));
  };

  const handleNextPageClick = (): void => {
    router.push(createHref(page + 1));
  };

  const handleButtonPageClick = (index: number) => {
    router.push(createHref(index + 1));
  };

  return (
    <Suspense fallback={<div>...</div>}>
      <div className="flex space-x-4">
        <button
          onClick={handlePrevPageClick}
          disabled={page === 1}
          className={
            page === 1 ? 'text-gray-300' : 'hover:text-gray-400 transition'
          }
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <ul className="flex space-x-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              {page === index + 1 ? (
                <span className="block grid place-items-center w-8 h-8 rounded-full bg-blue-500 text-white">
                  {index + 1}
                </span>
              ) : (
                <button
                  onClick={() => handleButtonPageClick(index)}
                  className="w-8 h-8 border rounded-full hover:bg-indigo-50 transition"
                >
                  {index + 1}
                </button>
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={handleNextPageClick}
          disabled={isLast}
          className={
            isLast ? 'text-gray-300' : 'hover:text-gray-400 transition'
          }
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </Suspense>
  );
}
