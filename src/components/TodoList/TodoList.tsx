import DeleteIcon from '@mui/icons-material/Delete';
import {
   Button,
   Dialog,
   DialogActions,
   DialogTitle,
   InputLabel,
   MenuItem,
   Pagination,
   Select,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { EditTodo, TodoItem } from '@/components/';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchTodosList, todoSlice } from '@/store/reducers/todoSlice';

import { FiltersContainer, SFormControl, SList } from './TodoList.styled';

type EditingType = number | null;

type SortType = 'new' | 'old';

type FilterType = 'all' | 'completed' | 'active';

export function TodoList() {
   const { todos, page, totalPages, status, error } = useAppSelector(
      (state) => state.todoReducer
   );
   const { deleteAllTodos } = todoSlice.actions;
   const dispatch = useAppDispatch();

   const [isEditing, setIsEditing] = useState<EditingType>(null);
   const [sortBy, setSortBy] = useState<SortType>('new');
   const [filterBy, setFilterBy] = useState<FilterType>('all');
   const [limit, setLimit] = useState<5 | 10 | 20>(5);
   const [open, setOpen] = useState<boolean>(false);
   const selectedTodo = todos.find((todo) => todo.id === isEditing);

   let filtered = todos;

   if (filterBy === 'completed')
      filtered = filtered.slice().filter((todo) => todo.completed === true);

   if (filterBy === 'active')
      filtered = filtered.slice().filter((todo) => todo.completed === false);

   let sorted = filtered.slice().sort((a, b) => b.createdAt - a.createdAt);
   if (sortBy === 'old') sorted = filtered;

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
      dispatch(fetchTodosList({ page: value, limit, filter: filterBy }));
   };

   useEffect(() => {
      dispatch(fetchTodosList({ page: 1, limit, filter: filterBy }));
   }, [dispatch, limit, filterBy]);

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
                  <MenuItem value='completed'>Completed</MenuItem>
                  <MenuItem value='active'>Active</MenuItem>
                  <MenuItem value='all'>All</MenuItem>
               </Select>
            </SFormControl>
            <SFormControl size='small'>
               <InputLabel id='limit-label'>Limit</InputLabel>
               <Select
                  labelId='limit-label'
                  id='limit-select'
                  value={limit}
                  label='Limit'
                  onChange={(e) => setLimit(e.target.value)}
               >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
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
            {status === 'pending' && <div>Loading...</div>}
            {status === 'rejected' && (
               <div>{error || 'Something went wrong'}</div>
            )}
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
         <span></span>
         <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
         />
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
