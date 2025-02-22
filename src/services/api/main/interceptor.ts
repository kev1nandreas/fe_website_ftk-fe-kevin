import { ENV } from '@/configs/environment';
import axios from 'axios';

const baseURL = ENV.URI.BASE_URL;
const isServer = typeof window === 'undefined';

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async (config) => {
  // Only set Content-Type if it's not already set and not FormData
  if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  // Remove Content-Type header if FormData is being sent
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  // Handle token authentication
  if (isServer) {
    const { cookies } = await import('next/headers');
    const token = (await cookies()).get(ENV.TOKEN_KEY)?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
