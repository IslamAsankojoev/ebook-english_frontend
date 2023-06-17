import axiosInstance from './axios.config';

export const DictionaryService = {
  findAll: async () => {
    const response = await axiosInstance.get('/Dictionary/');
    const data = await response.data;
    return data;
  },
  findOne: async (id: number) => {
    const response = await axiosInstance.get(`/Dictionary/${id}/`);
    const data = await response.data;
    return data;
  },
  create: async (data: IWord) => {
    const response = await axiosInstance.post('/Dictionary/', data);
    const res = await response.data;
    return res;
  },
  update: async (id: number, data: IWord) => {
    const response = await axiosInstance.put(`/Dictionary/${id}/`, data);
    const res = await response.data;
    return res;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/Dictionary/${id}/`);
    const res = await response.data;
    return res;
  },
};

export type IWord = {
  id?: number;
  name: string;
  description: string;
  user?: number;
};
