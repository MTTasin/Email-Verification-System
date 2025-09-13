import axios from 'axios';

// Create a reusable Axios instance
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can also add interceptors here to automatically add the auth token
// to every request after the user logs in.

export default apiClient;
