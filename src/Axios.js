import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://shortletbooking.com/api',
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Check if access token is present in local storage
    const accessToken = localStorage.getItem('Shbro');

    // If access token is present, include it in the request headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
