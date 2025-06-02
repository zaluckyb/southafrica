'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '../ui/input';

function NavSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentSearchParam = searchParams.get('search')?.toString() || '';
  const [search, setSearch] = useState(currentSearchParam);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    replace(`/?${params.toString()}`);
  }, 500);

  useEffect(() => {
    const param = searchParams.get('search') || '';
    setSearch(param);
  }, [searchParams]); // ✅ Fix: Now safe and avoids complex expression in deps

  return (
    <Input
      type="text"
      placeholder="find a property..."
      className="max-w-xs dark:bg-muted"
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
}

export default NavSearch;
