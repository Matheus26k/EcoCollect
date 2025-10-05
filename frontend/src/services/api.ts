import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const UNAUTHORIZED = 401;
    const DEFAULT_ERROR_MESSAGE = 'Erro interno do servidor';
    
    if (error.response?.status === UNAUTHORIZED) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    const message = error.response?.data?.error || DEFAULT_ERROR_MESSAGE;
    toast.error(message);
    
    return Promise.reject(error);
  }
);