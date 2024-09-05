// src/components/LearningPath.js

import React from 'react';

const LearningPath = ({ query }) => {
  const paths = [
    { id: 1, title: 'Intro to JavaScript', description: 'Basics of JavaScript' },
    { id: 2, title: 'Advanced React', description: 'Deep dive into React hooks and state management' },
  ];

  const filteredPaths = paths.filter(path => path.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-extrabold text-gray-800">Learning Paths for "{query}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {filteredPaths.length > 0 ? (
          filteredPaths.map((path) => (
            <div key={path.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-bold text-gray-900">{path.title}</h3>
              <p className="mt-2 text-gray-600">{path.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No learning paths found for this query.</p>
        )}
      </div>
    </div>
  );
};

export default LearningPath;

