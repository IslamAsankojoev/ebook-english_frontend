import axiosInstance from './axios.config';

export const TestTypeService = {
  findAll: async () => {
    const response = await axiosInstance.get('/testtypes/');
    const data = await response.data;
    return data;
  },
  findOne: async (id: number) => {
    const response = await axiosInstance.get(`/testtypes/${id}/`);
    const data = await response.data;
    return data;
  },
  create: async (data: ITestTypes) => {
    const response = await axiosInstance.post('/testtypes/', data);
    const res = await response.data;
    return res;
  },
  update: async (id: number, data: ITestTypes) => {
    const response = await axiosInstance.put(`/testtypes/${id}/`, data);
    const res = await response.data;
    return res;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/testtypes/${id}/`);
    const res = await response.data;
    return res;
  },
};

export type ITestTypes = {
  id?: number;
  name: string;
};
