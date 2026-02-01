import axios from 'axios';

const GITHUB_API_KEY = import.meta.env.VITE_GITHUB_API_KEY;

export const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token ${GITHUB_API_KEY}`
    }
  });
  return response.data;
};
