import DeleteIcon from '@mui/icons-material/Delete';
import {
   Button,
   Dialog,
   DialogActions,
   DialogTitle,
   InputLabel,
   MenuItem,
   Select,
} from '@mui/material';
import { useState } from 'react';

import { EditTodo, TodoItem } from '@/components/';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { todoSlice } from '@/store/reducers/TodoSlice';

import { FiltersContainer, SFormControl, SList } from './TodoList.styled';
import { EditingType, FilterType, SortType } from './TodoList.types';

function TodoList() {
   const { todos } = useAppSelector((state) => state.todoReducer);
   const { deleteAllTodos } = todoSlice.actions;
   const dispatch = useAppDispatch();

   const [isEditing, setIsEditing] = useState<EditingType>(null);
   const [sortBy, setSortBy] = useState<SortType>('new');
   const [filterBy, setFilterBy] = useState<FilterType>('all');
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
            <SFormControl size='small'>
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
            </SFormControl>
            <SFormControl size='small'>
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
            </SFormControl>
         </FiltersContainer>
         <SList>
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
         </SList>
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
