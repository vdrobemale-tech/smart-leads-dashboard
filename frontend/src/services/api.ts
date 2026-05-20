import axios from 'axios';
import { LOCAL_STORAGE_TOKEN_KEY } from '../utils/constants';

const api = axios.create({
  // 🔴 FIX: Direct URL daal diya hai ab - environment variable hataya
  baseURL: 'https://smart-leads-dashboard-9tzd.onrender.com/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — har request pe token lagao
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor — 401 aaye to logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      window.location.href = '/login';
    } else if (error.response?.status === 404) {
      console.error('API Route Not Found:', error.config?.url);
    }
    return Promise.reject(error);
  }
);

export default api;
