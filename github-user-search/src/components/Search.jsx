import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setUserData([]);

    try {
      const data = await fetchUserData({ username, location, minRepos });
      setUserData(data.items);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-component p-4 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minRepos">Minimum Repositories</label>
          <input
            type="number"
            placeholder="Enter minimum repositories"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Looks like we cant find the user</p>}
      {userData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userData.map((user) => (
            <div key={user.id} className="user-card bg-white shadow-md rounded p-4 flex flex-col items-center">
              <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full mb-4" />
              <h2 className="text-xl font-bold mb-2">{user.login}</h2>
              <p className="text-gray-600">Location: {user.location || 'N/A'}</p>
              <p className="text-gray-600">Repositories: {user.public_repos || 'N/A'}</p>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2">View Profile</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
