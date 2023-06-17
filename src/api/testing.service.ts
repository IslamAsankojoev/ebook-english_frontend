import axiosInstance from './axios.config';

interface IParams {
  level_id?: number | string;
  test_type_id?: number | string;
}

export const TestingService = {
  findAll: async (params: IParams) => {
    const response = await axiosInstance.get('/testing/', { params });
    const data = await response.data;
    return data;
  },
  findOne: async (id: number) => {
    const response = await axiosInstance.get(`/testing/${id}/`);
    const data = await response.data;
    return data;
  },
  create: async (data: ITesting) => {
    const response = await axiosInstance.post('/testing/', data);
    const res = await response.data;
    return res;
  },
  update: async (id: number, data: ITesting) => {
    const response = await axiosInstance.put(`/testing/${id}/`, data);
    const res = await response.data;
    return res;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/testing/${id}/`);
    const res = await response.data;
    return res;
  },
};

export type ITesting = {
  id?: number;
  question: number;
  user: number;
  user_answer: string;
  is_correct: boolean;
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
};
