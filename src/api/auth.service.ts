import axiosInstance from './axios.config';

export const AuthService = {
  login: async (username: string, password: string) => {
    const response = await axiosInstance.post('/api/token/', { username, password });
    const data = await response.data;
    return data;
  },
  register: async (username: string, email: string, password: string, is_author: boolean) => {
    const response = await axiosInstance.post('/users/', {
      username,
      email,
      password,
      is_author,
    });
    const data = await response.data;
    return data;
  },
};

export type ILogin = {
  email: string;
  password: string;
};
