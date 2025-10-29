import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';

import { useAppDispatch } from '../hooks/hooks';
import { todoSlice } from '../store/reducers/TodoSlice';
import {
   getLocalStorageItem,
   setLocalStorageItem,
} from '../utils/localstorage';

const FormContainer = styled.form`
   display: flex;
   gap: 16px;
`;

const SubmitButton = styled(Button)`
   && {
      transition: all 0.2s ease;

      &:hover,
      &:focus-visible {
         color: rgba(255, 255, 255, 0.87);
         border-color: #42a5f5;
         background-color: #42a5f5;
      }
   }
`;

function AddTodo() {
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

            <SubmitButton variant='outlined' type='submit'>
               Add Task
            </SubmitButton>
         </FormContainer>
      </div>
   );
}

export default AddTodo;
