import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
        groupId,
      });
      alert('Logged in successfully');
      navigate('/options');
    } catch (error) {
      alert(error.response.data.error || 'Login failed');
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
        groupName,
      });
      alert(`Group created successfully! Share this Group ID: ${response.data.groupId}`);
      navigate('/options');
    } catch (error) {
      alert(error.response.data.error || 'Group creation failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isCreatingGroup ? 'Create a New Group' : 'Login'}
        </h2>
        {isCreatingGroup ? (
          <form onSubmit={handleCreateGroup} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="groupName" className="block text-gray-600">Group Name</label>
              <input
                type="text"
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Create Group
            </button>
            <p
              className="text-center text-gray-600 mt-4 cursor-pointer"
              onClick={() => setIsCreatingGroup(false)}
            >
              Already have a group? Login instead
            </p>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="groupId" className="block text-gray-600">Group ID</label>
              <input
                type="text"
                id="groupId"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
            <p
              className="text-center text-gray-600 mt-4 cursor-pointer"
              onClick={() => setIsCreatingGroup(true)}
            >
              Don't have a group? Create one instead
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
