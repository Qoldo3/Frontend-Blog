// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/blog/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auto-add auth token if exists (for future login)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Token ${token}`; // or `Bearer ${token}` for JWT
  }
  return config;
});

// Critical fix: Handle DRF pagination
export const fetchPosts = async () => {
  const response = await api.get('/posts/');
  const data = response.data;

  // DRF pagination returns { count, next, previous, results }
  if (data.results && Array.isArray(data.results)) {
    return data.results;
  }

  // If pagination is disabled, it returns array directly
  if (Array.isArray(data)) {
    return data;
  }

  throw new Error('Unexpected response format from API');
};

export const fetchPostById = async (id) => {
  const response = await api.get(`/posts/${id}/`);
  return response.data; // Single post is always an object
};

export const createPost = async (postData) => {
  const response = await api.post('/posts/', postData);
  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await api.patch(`/posts/${id}/`, postData);
  return response.data;
};

export const deletePost = async (id) => {
  await api.delete(`/posts/${id}/`);
  return true;
};

export default api;