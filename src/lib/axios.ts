import axios from 'axios';

// Ensure you have VITE_API_BASE_URL=http://localhost:8000/api in your .env
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. REQUEST INTERCEPTOR: Attach the access token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. RESPONSE INTERCEPTOR: Handle 401s and refresh tokens
api.interceptors.response.use(
  (response) => response, // Pass successful responses through
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't already retried this request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          // Attempt to get a new access token
          const response = await axios.post(`${API_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          const newAccessToken = response.data.access;
          
          // Save the new token
          localStorage.setItem('accessToken', newAccessToken);
          
          // If the backend also rotated the refresh token, save it
          if (response.data.refresh) {
            localStorage.setItem('refreshToken', response.data.refresh);
          }

          // Update the authorization header and retry the original request
          api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
          
        } catch (refreshError) {
          // The refresh token is expired or invalid. 
          // Log the user out, clear tokens, and redirect to login.
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, force logout
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);