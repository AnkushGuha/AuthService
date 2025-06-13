import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-api.vercel.app/api'  // Replace with your actual backend URL
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      
      // Only redirect if we're on the dashboard
      if (window.location.hostname.includes('flowgen-dash')) {
        const landingUrl = process.env.NODE_ENV === 'production' 
          ? 'https://flowgen-arc.vercel.app'
          : 'http://localhost:5173';
        window.location.href = landingUrl;
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Authentication
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async signup(userData: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    }
  },

  // User data
  async getCurrentUser() {
    const response = await api.get('/user');
    return response.data.user;
  },

  async updateProfile(profileData: {
    firstName?: string;
    lastName?: string;
  }) {
    const response = await api.put('/user/profile', profileData);
    return response.data;
  },

  // Token management
  setToken(token: string) {
    localStorage.setItem('authToken', token);
  },

  getToken() {
    return localStorage.getItem('authToken');
  },

  removeToken() {
    localStorage.removeItem('authToken');
  }
};