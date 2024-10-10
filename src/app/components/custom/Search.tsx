'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchProps {
  initialQuery: string;
  placeholder: string;
}

export default function SearchComponent({ initialQuery, placeholder }: SearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Debounce for real-time search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (query) {
        params.set('query', query);
      } else {
        params.delete('query');
      }
      params.set('page', '1'); // Reset to page 1 on a new search
      router.replace(`?${params.toString()}`);
    }, 500); // Debounce timeout (500ms)

    return () => clearTimeout(delayDebounceFn);
  }, [query, router]);

  return (
    <div className="">
      <div className="flex justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="p-2 border border-gray-300 rounded-md w-72 focus:outline-none"
        />
      </div>
    </div>
  );
}
