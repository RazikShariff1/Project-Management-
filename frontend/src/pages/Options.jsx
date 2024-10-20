// src/pages/Options.jsx
import React from 'react';

function Options() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        What would you like to do?
      </h2>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Create a Group
        </button>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          Join a Group
        </button>
      </div>
    </div>
  );
}

export default Options;
