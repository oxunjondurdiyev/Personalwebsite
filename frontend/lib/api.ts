import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const auth = {
  login: async (username: string, password: string) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const response = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  logout: () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  },
};

export const posts = {
  getAll: async (skip = 0, limit = 10, published_only = true) => {
    const response = await api.get('/posts/', { params: { skip, limit, published_only } });
    return response.data;
  },
  getBySlug: async (slug: string, language: string) => {
    const response = await api.get(`/posts/slug/${slug}`, { params: { language } });
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  search: async (query: string, language: string, skip = 0, limit = 10) => {
    const response = await api.get('/posts/search', { params: { q: query, language, skip, limit } });
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/posts/', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/posts/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
  getCount: async () => {
    const response = await api.get('/posts/count');
    return response.data;
  },
};

export const categories = {
  getAll: async () => {
    const response = await api.get('/categories/');
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/categories/', data);
    return response.data;
  },
};

export const tags = {
  getAll: async () => {
    const response = await api.get('/tags/');
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/tags/', data);
    return response.data;
  },
};

export const users = {
  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  updateMe: async (data: any) => {
    const response = await api.put('/users/me', data);
    return response.data;
  },
  getAll: async (skip = 0, limit = 100) => {
    const response = await api.get('/users/', { params: { skip, limit } });
    return response.data;
  },
};

export default api;
