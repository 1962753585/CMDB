import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const http = axios.create({
  baseURL: '/',
  timeout: 3000,
});

http.interceptors.request.use((config) => {
  const authStore = useAuthStore();

  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    const payload = response.data;

    if (payload.code !== 200) {
      ElMessage.error(payload.message || '请求失败');
      return Promise.reject(payload);
    }

    return payload;
  },
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
      router.replace('/login');
    }

    ElMessage.error(error.message || '网络异常');
    return Promise.reject(error);
  },
);

export default http;
