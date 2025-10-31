import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Checkbox, ListItemButton } from '@mui/material';

import { useAppDispatch } from '@/hooks/hooks';
import { todoSlice } from '@/store/reducers/TodoSlice';

import { DeleteIconButton, EditIconButton, ItemText } from './TodoItem.styled';
import { TodoItemProps } from './TodoItem.types';

function TodoItem({ todo, onIsEditing }: TodoItemProps) {
   const { id, task, completed } = todo;
   const { toggleTodo, deleteTodo } = todoSlice.actions;
   const dispatch = useAppDispatch();

   return (
      <ListItemButton onClick={() => dispatch(toggleTodo(id))}>
         <Checkbox checked={completed} />
         <ItemText
            primary={task}
            style={completed ? { textDecoration: 'line-through' } : {}}
         />
         <EditIconButton
            onClick={(e) => {
               e.stopPropagation();
               onIsEditing(id);
            }}
         >
            <EditIcon className='icon' fontSize='small' color='disabled' />
         </EditIconButton>
         <DeleteIconButton
            onClick={(e) => {
               e.stopPropagation();
               dispatch(deleteTodo(id));
            }}
         >
            <RemoveCircleIcon
               className='icon'
               fontSize='small'
               color='disabled'
            />
         </DeleteIconButton>
      </ListItemButton>
   );
}

export default TodoItem;
