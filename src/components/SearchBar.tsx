import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface Props {
  onSearch: (query: string) => void;
  initialQuery: string;
}

const SearchBar = ({ onSearch, initialQuery }: Props): JSX.Element => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        title="submit search"
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;
