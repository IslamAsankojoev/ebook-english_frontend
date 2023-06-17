import axiosInstance from './axios.config';

export const NoteService = {
  findAll: async () => {
    const response = await axiosInstance.get('/notes/');
    const data = await response.data;
    return data;
  },
  findOne: async (id: number) => {
    const response = await axiosInstance.get(`/notes/${id}/`);
    const data = await response.data;
    return data;
  },
  create: async (data: INote) => {
    const response = await axiosInstance.post('/notes/', data);
    const res = await response.data;
    return res;
  },
  update: async (id: number, data: INote) => {
    const response = await axiosInstance.put(`/notes/${id}/`, data);
    const res = await response.data;
    return res;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/notes/${id}/`);
    const res = await response.data;
    return res;
  },
};

export type INote = {
  id?: number;
  message: string;
  user?: number;
};
