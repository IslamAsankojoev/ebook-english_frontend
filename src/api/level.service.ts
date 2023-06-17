import axiosInstance from './axios.config';

export const LevelService = {
  findAll: async () => {
    const response = await axiosInstance.get('/levels/');
    const data = await response.data;
    return data;
  },
  findOne: async (id: number) => {
    const response = await axiosInstance.get(`/levels/${id}/`);
    const data = await response.data;
    return data;
  },
  create: async (data: ILevel) => {
    const response = await axiosInstance.post('/levels/', data);
    const res = await response.data;
    return res;
  },
  update: async (id: number, data: ILevel) => {
    const response = await axiosInstance.put(`/levels/${id}/`, data);
    const res = await response.data;
    return res;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/levels/${id}/`);
    const res = await response.data;
    return res;
  },
};

export type ILevel = {
  id?: number;
  name: string;
};
