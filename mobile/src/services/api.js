import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach access token to every request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = await AsyncStorage.getItem('refresh_token');
        const res = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, { refresh });
        await AsyncStorage.setItem('access_token', res.data.access);
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return api(originalRequest);
      } catch {
        await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth ──────────────────────────────────────────────────────────────
export const loginUser = (credentials) =>
  api.post('/auth/token/', credentials);

export const registerUser = (data) =>
  api.post('/auth/register/', data);

export const getProfile = () =>
  api.get('/auth/profile/');

export const updateProfile = (data) =>
  api.patch('/auth/profile/', data);

// ─── Programs ──────────────────────────────────────────────────────────
export const getPrograms = () =>
  api.get('/programs/');

export const getProgramById = (id) =>
  api.get(`/programs/${id}/`);

// ─── Donations ─────────────────────────────────────────────────────────
export const getDonations = () =>
  api.get('/donations/');

export const createDonation = (data) =>
  api.post('/donations/', data);

// ─── Volunteers ────────────────────────────────────────────────────────
export const registerVolunteer = (data) =>
  api.post('/volunteer/register/', data);

export const getVolunteers = () =>
  api.get('/volunteer/list/');

// ─── Contact ───────────────────────────────────────────────────────────
export const sendContactMessage = (data) =>
  api.post('/contact/send/', data);

export default api;
