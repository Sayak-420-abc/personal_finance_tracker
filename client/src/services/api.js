import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

/**
 * Set the auth token getter function.
 * Called from App.jsx after Clerk initializes.
 */
let getTokenFn = null;

export function setTokenGetter(fn) {
  getTokenFn = fn;
}

// Attach Clerk JWT to every request automatically
api.interceptors.request.use(async (config) => {
  if (getTokenFn) {
    try {
      const token = await getTokenFn();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error('Failed to get auth token:', err);
    }
  }
  return config;
});

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — could trigger re-auth
      console.warn('Unauthorized request — token may be expired');
    }
    return Promise.reject(error);
  }
);

export default api;
