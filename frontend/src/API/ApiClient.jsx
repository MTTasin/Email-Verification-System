import axios from 'axios';

// Create a reusable Axios instance
const apiClient = axios.create({
  baseURL: 'https://api.veriflow.com/v1', // Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can also add interceptors here to automatically add the auth token
// to every request after the user logs in.

export default apiClient;
