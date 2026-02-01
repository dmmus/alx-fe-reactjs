import axios from 'axios';

const GITHUB_API_KEY = import.meta.env.VITE_GITHUB_API_KEY;

export const fetchUserData = async ({ username, location, minRepos }) => {
  let query = '';
  if (username) query += `${username}`;
  if (location) query += `${username ? '+' : ''}location:${location}`;
  if (minRepos) query += `${(username || location) ? '+' : ''}repos:>${minRepos}`;

  const response = await axios.get(`https://api.github.com/search/users?q=${query}`, {
    headers: {
      Authorization: `token ${GITHUB_API_KEY}`
    }
  });
  return response.data;
};
