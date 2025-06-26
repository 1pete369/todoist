import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosInstance = axios.create({
  baseURL: 'http://192.168.29.67:5001/api',
  timeout: 10000,
});

// ✅ Attach token from AsyncStorage to every request
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    console.log('Interceptor token:', token); // ✅ Check if correct
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
);
