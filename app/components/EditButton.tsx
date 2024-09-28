'use client';

import { useRouter } from 'next/navigation';

export default function EditButton({ id }: { id: number }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/lists/${id}/edit`)}
      className="text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      編集する
    </button>
  );
}
