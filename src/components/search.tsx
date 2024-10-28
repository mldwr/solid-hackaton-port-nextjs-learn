// No need for 'use client' in SolidJS

import { Component, createSignal } from 'solid-js';
import { useNavigate, useLocation, useSearchParams } from '@solidjs/router';
import { HiSolidMagnifyingGlass } from 'solid-icons/hi';
import { debounce } from '@solid-primitives/scheduled';

interface SearchProps {
  placeholder: string;
}

export const Search: Component<SearchProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Create a debounced search function
  const handleSearch = debounce((term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    // Update the URL with new search params
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, 300);

  return (
    <div class="relative flex flex-1 flex-shrink-0">
      <label for="search" class="sr-only">
        Search
      </label>
      <input
        class="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={props.placeholder}
        onInput={(e) => {
          handleSearch(e.currentTarget.value);
        }}
        value={searchParams.query || ''}
      />
      <HiSolidMagnifyingGlass class="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};

export default Search;