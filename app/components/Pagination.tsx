'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

  return (
    <div className="flex space-x-2">
      <button onClick={handlePrevPageClick} disabled={page === 1}>
        Prev
      </button>

      <ul className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            {page === index + 1 ? (
              <span>{index + 1}</span>
            ) : (
              <button>
                <Link href={createHref(index + 1)}>{index + 1}</Link>
              </button>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleNextPageClick} disabled={isLast}>
        Next
      </button>
    </div>
  );
}
