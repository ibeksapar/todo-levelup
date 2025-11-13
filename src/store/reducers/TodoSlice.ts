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
   { page: number; limit: number; filter: 'active' | 'completed' | 'all' },
   { rejectValue: string }
>('todos/fetchTodos', async ({ page, limit, filter }, { rejectWithValue }) => {
   try {
      const data = await fetchTodos(page, limit, filter);
      console.log(data);
      return data;
   } catch {
      return rejectWithValue('Error with getting data from server');
   }
});

export const createTodoThunk = createAsyncThunk<
   IToDo,
   string,
   { rejectValue: string }
>('todos/createTodo', async (text, { rejectWithValue, dispatch }) => {
   try {
      const data = await createTodo(text);
      dispatch(addTodo(data));
      return data;
   } catch {
      return rejectWithValue('Creating todo error');
   }
});

export const updateTodoThunk = createAsyncThunk<
   IToDo,
   { id: number; updates: { text?: string; completed?: boolean } },
   { rejectValue: string }
>(
   'todos/updateTodo',
   async ({ id, updates }, { rejectWithValue, dispatch }) => {
      try {
         const updatedTodo = await updateTodo(id, updates);
         if (typeof updates.completed === 'boolean') {
            dispatch(toggleTodo(updatedTodo));
         }

         if (updates.text) dispatch(editTodo(updatedTodo));
         return updatedTodo;
      } catch {
         return rejectWithValue('Edit todo error');
      }
   }
);

export const deleteTodoThunk = createAsyncThunk<
   number,
   number,
   { rejectValue: string }
>('todos/deleteTodo', async (id, { rejectWithValue }) => {
   try {
      await removeTodo(id);
      return id;
   } catch {
      return rejectWithValue('Delete todo error');
   }
});

export const toggleTodoThunk = createAsyncThunk<
   number,
   number,
   { rejectValue: string }
>('todos/toggleTodo', async (id, { rejectWithValue }) => {
   try {
      await toggleTodoStatus(id);
      return id;
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
      addTodo: (state, action) => {
         state.todos.push(action.payload);
      },

      toggleTodo: (state, action) => {
         const toggleItem = state.todos.find(
            (todo) => todo.id === action.payload.id
         );
         if (toggleItem) toggleItem.completed = action.payload.completed;
      },

      editTodo: (state, action) => {
         const { id, text } = action.payload.data;
         const editItem = state.todos.find((todo) => todo.id === id);
         if (editItem) editItem.text = text;
      },

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
      builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
         state.status = 'fulfilled';
         state.error = null;
         state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
      builder.addCase(toggleTodoThunk.fulfilled, (state, action) => {
         const todoItem = state.todos.find(
            (todo) => todo.id === action.payload
         );
         if (todoItem) todoItem.completed = !todoItem.completed;
      });
   },
});

export const { addTodo, toggleTodo, editTodo, deleteAllTodos } =
   todoSlice.actions;
export default todoSlice.reducer;
