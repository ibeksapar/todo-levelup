import { Button, TextField } from '@mui/material';
import { useState } from 'react';

import { useAppDispatch } from '@/hooks/hooks';
import { createTodoThunk } from '@/store/reducers/todoSlice';

import { FormContainer } from './AddTodo.styled';

export function AddTodo() {
   const [text, setText] = useState<string>('');
   const dispatch = useAppDispatch();
   const [error, setError] = useState<boolean>(false);

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (!text || text.length > 100) {
         setError(true);
         return;
      }

      dispatch(createTodoThunk(text));
      setError(false);
      setText('');
   }

   return (
      <div>
         <FormContainer onSubmit={handleSubmit}>
            <TextField
               error={error && !text}
               label='New task'
               variant='standard'
               value={text}
               helperText={error && !text ? 'Invalid entry' : ''}
               onChange={(e) => setText(e.target.value)}
            />

            <Button variant='outlined' type='submit'>
               Add Task
            </Button>
         </FormContainer>
      </div>
   );
}
