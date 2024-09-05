import React, { useState } from 'react';

const Chatbot = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // Replace with your API endpoint
    const API_URL = `https://api.example.com/search?q=${searchQuery}`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setResults(data.results); // Adjust based on the API response structure
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <form className="flex w-full max-w-md" onSubmit={handleSearch}>
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>

      {/* Display search results */}
      <div className="mt-4 w-full max-w-md">
        {results.length > 0 ? (
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li key={index} className="p-2 border border-gray-200 rounded-md">
                {result.title || result.name} {/* Adjust based on your data */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
