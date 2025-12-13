import { Button, TextField } from '@mui/material';
import { useState } from 'react';

import { useAppDispatch } from '@/hooks/hooks';
import { todoSlice } from '@/store/reducers/TodoSlice';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/localstorage';

import { FormContainer } from './AddTodo.styled';

export function AddTodo() {
   const [todo, setTodo] = useState<string>('');
   const { addTodo } = todoSlice.actions;
   const dispatch = useAppDispatch();
   const [error, setError] = useState<boolean>(false);

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (!todo || todo.length > 100) {
         setError(true);
         return;
      }

      const todoObj = {
         id: Date.now() * Math.random(),
         task: todo,
         completed: false,
         createdAt: Date.now(),
      };

      const stored = getLocalStorageItem('todos', []);
      const updated = [...stored, todoObj];

      setLocalStorageItem('todos', updated);
      dispatch(addTodo(todoObj));
      setError(false);
      setTodo('');
   }

   return (
      <div>
         <FormContainer onSubmit={handleSubmit}>
            <TextField
               error={error && !todo}
               label='New task'
               variant='standard'
               value={todo}
               helperText={error && !todo ? 'Invalid entry' : ''}
               onChange={(e) => setTodo(e.target.value)}
            />

            <Button variant='outlined' type='submit'>
               Add Task
            </Button>
         </FormContainer>
      </div>
   );
}
