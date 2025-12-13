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
   filter: 'active' | 'completed' | 'all',
   accessToken: string
): Promise<FetchTodoResponse> => {
   const response = await axios.get<FetchTodoResponse>(
      `${API_URL}/todos?page=${page}&limit=${limit}&filter=${filter}`,
      {
         headers: { Authorization: `Bearer ${accessToken}` },
      }
   );
   return response.data;
};

export const createTodo = async (text: string, accessToken: string) => {
   const { data } = await axios.post(
      `${API_URL}/todos`,
      { text },
      {
         headers: { Authorization: `Bearer ${accessToken}` },
      }
   );
   return data;
};

export const updateTodo = async (
   id: number,
   updates: { text?: string; completed?: boolean },
   accessToken: string
) => {
   const response = await axios.put(`${API_URL}/todos/${id}`, updates, {
      headers: { Authorization: `Bearer ${accessToken}` },
   });
   return response.data;
};

export const removeTodo = async (id: number, accessToken: string) => {
   const response = await axios.delete(`${API_URL}/todos/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
   });
   return response.status;
};

export const toggleTodoStatus = async (id: number, accessToken: string) => {
   const response = await axios.patch(`${API_URL}/todos/${id}/toggle`, null, {
      headers: { Authorization: `Bearer ${accessToken}` },
   });
   return response.data;
};
