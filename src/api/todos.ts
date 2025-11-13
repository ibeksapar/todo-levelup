import axios from 'axios';

import { IToDo } from '@/models/IToDo';

const API_URL = 'http://localhost:3001';

export interface FetchTodoResponse {
   data: IToDo[];
   page: number;
   limit: number;
   total: number;
   totalPages: number;
}

export const fetchTodos = async (
   page: number,
   limit: number,
   filter: 'active' | 'completed' | 'all'
): Promise<FetchTodoResponse> => {
   const response = await axios.get<FetchTodoResponse>(
      `${API_URL}/todos?page=${page}&limit=${limit}&filter=${filter}`
   );
   return response.data;
};

export const createTodo = async (text: string) => {
   const { data } = await axios.post(`${API_URL}/todos`, { text });
   return data;
};

export const updateTodo = async (
   id: number,
   updates: { text?: string; completed?: boolean }
) => {
   const response = await axios.put(`${API_URL}/todos/${id}`, updates);
   return response.data;
};

export const removeTodo = async (id: number) => {
   const response = await axios.delete(`${API_URL}/todos/${id}`);
   return response.status;
};

export const toggleTodoStatus = async (id: number) => {
   return await axios.patch(`${API_URL}/todos/${id}/toggle`);
};
