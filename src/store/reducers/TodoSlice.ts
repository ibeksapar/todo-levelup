import { createSlice } from '@reduxjs/toolkit';
import { IToDo } from '../../models/IToDo';
import {
   removeLocalStorageItem,
   setLocalStorageItem,
} from '../../utils/localstorage';

interface TodoState {
   todos: IToDo[];
}

const initialState: TodoState = {
   todos: JSON.parse(localStorage.getItem('todos') || '[]'),
};

export const todoSlice = createSlice({
   name: 'todo',
   initialState,
   reducers: {
      addTodo: (state, action) => {
         state.todos.push(action.payload);
      },

      toggleTodo: (state, action) => {
         const toggleItem = state.todos.find(
            (todo) => todo.id === action.payload
         );
         if (toggleItem) toggleItem.completed = !toggleItem.completed;
         setLocalStorageItem('todos', state.todos);
      },

      editTodo: (state, action) => {
         const { id, task } = action.payload;
         const editItem = state.todos.find((todo) => todo.id === id);
         if (editItem) editItem.task = task;
         setLocalStorageItem('todos', state.todos);
      },

      deleteTodo: (state, action) => {
         state.todos = state.todos.filter((todo) => todo.id !== action.payload);
         setLocalStorageItem('todos', state.todos);
      },

      deleteAllTodos: (state) => {
         state.todos = [];
         removeLocalStorageItem('todos');
      },
   },
});

export const { addTodo, toggleTodo, editTodo, deleteTodo, deleteAllTodos } =
   todoSlice.actions;
export default todoSlice.reducer;
