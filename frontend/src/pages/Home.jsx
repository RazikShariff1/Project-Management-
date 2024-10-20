// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 overflow-hidden flex items-center justify-center">
      {/* Blobs */}
      <div className="absolute top-0 -left-10 w-72 h-72 bg-purple-400 opacity-70 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
      <div className="absolute top-20 -right-10 w-72 h-72 bg-pink-400 opacity-70 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-10 left-20 w-72 h-72 bg-blue-400 opacity-70 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Welcome to Project Manager Pro
        </h1>
        <p className="text-gray-200 text-lg mb-8 max-w-md mx-auto drop-shadow-md">
          Manage your projects efficiently and collaborate with your team seamlessly.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-white text-blue-500 px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
