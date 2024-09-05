// src/components/SearchBar.js

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center mt-8">
      <input 
        type="text" 
        className="w-full p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Search for resources, materials, or documents..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button 
        type="submit" 
        className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition duration-200"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
