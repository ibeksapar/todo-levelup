import {
   Button,
   Dialog,
   DialogActions,
   DialogTitle,
   FormControl,
   InputLabel,
   List,
   MenuItem,
   Select,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import TodoItem from './TodoItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { todoSlice } from '../store/reducers/TodoSlice';
import EditTodo from './EditTodo';

import styled from 'styled-components';

const FiltersContainer = styled.div`
   display: flex;
   justify-content: space-between;
`;

const StyledList = styled(List)`
   && {
      max-height: 200px;
      overflow-y: auto;

      &::-webkit-scrollbar {
         width: 4px;
      }
      &::-webkit-scrollbar-thumb {
         background-color: #bababa;
         border-radius: 4px;
      }
      &::-webkit-scrollbar-track {
         background-color: rgba(255, 255, 255, 0.1);
         border-radius: 4px;
      }
   }
`;

function TodoList() {
   const { todos } = useAppSelector((state) => state.todoReducer);
   const { deleteAllTodos } = todoSlice.actions;
   const dispatch = useAppDispatch();

   const [isEditing, setIsEditing] = useState<number | null>(null);
   const [sortBy, setSortBy] = useState<'new' | 'old'>('new');
   const [filterBy, setFilterBy] = useState<'all' | 'done' | 'to-do'>('all');
   const [open, setOpen] = useState<boolean>(false);
   const selectedTodo = todos.find((todo) => todo.id === isEditing);

   let filtered = todos;

   if (filterBy === 'done')
      filtered = filtered.slice().filter((todo) => todo.completed === true);

   if (filterBy === 'to-do')
      filtered = filtered.slice().filter((todo) => todo.completed === false);

   let sorted = filtered.slice().sort((a, b) => b.createdAt - a.createdAt);
   if (sortBy === 'old') sorted = filtered;

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   return (
      <>
         <FiltersContainer
            style={{ display: 'flex', justifyContent: 'space-between' }}
         >
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
               <InputLabel id='filter-label'>Filter</InputLabel>
               <Select
                  labelId='filter-label'
                  id='filter-select'
                  value={filterBy}
                  label='Sort'
                  onChange={(e) => setFilterBy(e.target.value)}
               >
                  <MenuItem value='done'>Done</MenuItem>
                  <MenuItem value='to-do'>To do</MenuItem>
                  <MenuItem value='all'>All</MenuItem>
               </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
               <InputLabel id='sort-label'>Sort</InputLabel>
               <Select
                  labelId='sort-label'
                  id='sort-select'
                  value={sortBy}
                  label='Sort'
                  onChange={(e) => setSortBy(e.target.value)}
               >
                  <MenuItem value='new'>New</MenuItem>
                  <MenuItem value='old'>Old</MenuItem>
               </Select>
            </FormControl>
         </FiltersContainer>
         <StyledList>
            {sorted.map((todo) => (
               <TodoItem key={todo.id} todo={todo} onIsEditing={setIsEditing} />
            ))}

            {selectedTodo && (
               <EditTodo
                  isOpen={true}
                  onClose={() => setIsEditing(null)}
                  todo={selectedTodo}
               />
            )}
         </StyledList>
         {sorted.length > 0 && (
            <Button
               onClick={handleOpen}
               variant='outlined'
               color='error'
               size='small'
               startIcon={<DeleteIcon />}
            >
               Clear all
            </Button>
         )}
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you sure to delete all todos?</DialogTitle>
            <DialogActions>
               <Button variant='outlined' onClick={handleClose}>
                  Cancel
               </Button>
               <Button
                  variant='contained'
                  color='error'
                  onClick={() => {
                     dispatch(deleteAllTodos());
                     handleClose();
                  }}
               >
                  Confirm
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
}

export default TodoList;
