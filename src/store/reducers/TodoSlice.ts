import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
   createTodo,
   FetchTodoResponse,
   fetchTodos,
   removeTodo,
   toggleTodoStatus,
   updateTodo,
} from '@/api/todos';
import { IToDo } from '@/models/IToDo';

import { RootState } from '../store';

interface TodoState {
   todos: IToDo[];
   status: null | 'fulfilled' | 'pending' | 'rejected';
   error: null | string;
   limit: number;
   page: number;
   total: number;
   totalPages: number;
}

export const fetchTodosList = createAsyncThunk<
   FetchTodoResponse,
   {
      page: number;
      limit: number;
      filter: 'active' | 'completed' | 'all';
   },
   { state: RootState; rejectValue: string }
>(
   'todos/fetchTodos',
   async ({ page, limit, filter }, { getState, rejectWithValue }) => {
      try {
         const token = getState().authReducer.token;
         console.log(token);
         if (!token) return rejectWithValue('No auth token');
         const data = await fetchTodos(page, limit, filter, token);
         console.log(data);
         return data;
      } catch {
         return rejectWithValue('Error with getting data from server');
      }
   }
);

export const createTodoThunk = createAsyncThunk<
   IToDo,
   string,
   { state: RootState; rejectValue: string }
>('todos/createTodo', async (text, { getState, rejectWithValue }) => {
   try {
      const token = getState().authReducer.token;
      if (!token) return rejectWithValue('No auth token');
      const data = await createTodo(text, token);
      return data;
   } catch {
      return rejectWithValue('Creating todo error');
   }
});

export const updateTodoThunk = createAsyncThunk<
   IToDo,
   {
      id: number;
      updates: { text?: string; completed?: boolean };
   },
   { state: RootState; rejectValue: string }
>(
   'todos/updateTodo',
   async ({ id, updates }, { getState, rejectWithValue }) => {
      try {
         const token = getState().authReducer.token;
         if (!token) return rejectWithValue('No auth token');

         return await updateTodo(id, updates, token);
      } catch {
         return rejectWithValue('Edit todo error');
      }
   }
);

export const deleteTodoThunk = createAsyncThunk<
   number,
   number,
   { state: RootState; rejectValue: string }
>('todos/deleteTodo', async (id, { getState, rejectWithValue }) => {
   try {
      const token = getState().authReducer.token;
      if (!token) return rejectWithValue('No auth token');
      await removeTodo(id, token);
      return id;
   } catch {
      return rejectWithValue('Delete todo error');
   }
});

export const toggleTodoThunk = createAsyncThunk<
   IToDo,
   number,
   { state: RootState; rejectValue: string }
>('todos/toggleTodo', async (id, { getState, rejectWithValue }) => {
   try {
      const token = getState().authReducer.token;
      if (!token) return rejectWithValue('No auth token');
      return await toggleTodoStatus(id, token);
   } catch {
      return rejectWithValue('Toggle todo error');
   }
});

const initialState: TodoState = {
   todos: [],
   status: null,
   error: null,
   limit: 5,
   page: 1,
   total: 0,
   totalPages: 1,
};

export const todoSlice = createSlice({
   name: 'todos',
   initialState,
   reducers: {
      deleteAllTodos: (state) => {
         state.todos = [];
      },
   },
   extraReducers(builder) {
      builder.addCase(fetchTodosList.fulfilled, (state, action) => {
         state.status = 'fulfilled';
         state.todos = action.payload.data;
         state.limit = action.payload.limit;
         state.page = action.payload.page;
         state.total = action.payload.total;
         state.totalPages = action.payload.totalPages;
         state.error = null;
      });
      builder.addCase(fetchTodosList.pending, (state) => {
         state.status = 'pending';
         state.error = null;
      });
      builder.addCase(fetchTodosList.rejected, (state, action) => {
         state.status = 'rejected';
         state.error =
            typeof action.payload === 'string'
               ? action.payload
               : 'Unknown error';
      });
      builder.addCase(createTodoThunk.fulfilled, (state, action) => {
         state.todos.unshift(action.payload);
      });
      builder.addCase(updateTodoThunk.fulfilled, (state, action) => {
         const index = state.todos.findIndex(
            (todo) => todo.id === action.payload.id
         );
         if (index !== -1) state.todos[index] = action.payload;
      });
      builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
         state.status = 'fulfilled';
         state.error = null;
         state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
      builder.addCase(toggleTodoThunk.fulfilled, (state, action) => {
         const index = state.todos.findIndex(
            (todo) => todo.id === action.payload.id
         );
         if (index !== -1) state.todos[index] = action.payload;
      });
   },
});

export const { deleteAllTodos } = todoSlice.actions;
export default todoSlice.reducer;
