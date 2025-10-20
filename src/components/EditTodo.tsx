import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   TextField,
} from '@mui/material';
import { useState } from 'react';
import { IToDo } from '../models/IToDo';
import { useAppDispatch } from '../hooks/hooks';
import { todoSlice } from '../store/reducers/TodoSlice';

function EditTodo({
   isOpen,
   onClose,
   todo,
}: {
   isOpen: boolean;
   onClose: () => void;
   todo: IToDo;
}) {
   const [editTask, setEditTask] = useState<string>(todo.task);
   const dispatch = useAppDispatch();
   const { editTodo } = todoSlice.actions;
   const [error, setError] = useState<boolean>(false);

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (!editTask) {
         setError(true);
         return;
      }

      dispatch(editTodo({ id: todo.id, task: editTask }));
      setError(false);
      onClose();
   }

   return (
      <Dialog open={isOpen} onClose={onClose}>
         <DialogTitle>Edit task:</DialogTitle>
         <DialogContent>
            <form onSubmit={handleSubmit} id='edit-form'>
               <TextField
                  error={error && !editTask}
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  helperText={error && !editTask ? 'Invalid entry' : ''}
               />
            </form>
         </DialogContent>
         <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type='submit' form='edit-form'>
               Edit
            </Button>
         </DialogActions>
      </Dialog>
   );
}

export default EditTodo;
