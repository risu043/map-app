'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { fetchPosts } from '../post';

export default function Posts({ markerId }: { markerId: number }) {
  const { data: posts } = useQuery({
    queryKey: ['posts', markerId],
    queryFn: () => fetchPosts(markerId),
  });

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  if (!posts) {
    return <div className="p-4">Loading...</div>;
  }

  if (posts.length === 0) {
    return <div className="p-4">レビューがまだありません</div>;
  }

  if (posts.length === 1) {
    const profileImage = posts[0].profiles.profile_image || 'default.png';
    return (
      <div className="bg-white shadow rounded-lg p-4 flex">
        <div>
          <Image
            src={`/images/${profileImage}`}
            alt={posts[0].profiles.name}
            priority
            width={80}
            height={80}
            className="w-16 h-16 rounded-full object-cover border"
          />
          <p>{posts[0].profiles.name}</p>
        </div>
        <h2 className="text-lg font-semibold">{posts[0].title}</h2>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="divide-y divide-gray-200">
          {Array.isArray(posts) ? (
            posts.map((post) => {
              const profileImage = post.profiles.profile_image || 'default.png';
              return (
                <div key={post.id}>
                  <div>
                    <Image
                      src={`/images/${profileImage}`}
                      alt={post.profiles.name}
                      priority
                      width={80}
                      height={80}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <p>{post.profiles.name}</p>
                  </div>
                  <p className="py-2">{post.title}</p>
                </div>
              );
            })
          ) : (
            <div className="p-4 text-red-500">
              Error: Expected posts to be an array
            </div>
          )}
        </div>
      </div>
    </>
  );
}
