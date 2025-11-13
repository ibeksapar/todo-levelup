import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Checkbox, ListItemButton } from '@mui/material';

import { useAppDispatch } from '@/hooks/hooks';
import { IToDo } from '@/models/IToDo';
import { deleteTodoThunk, toggleTodoThunk } from '@/store/reducers/todoSlice';

import { DeleteIconButton, EditIconButton, ItemText } from './TodoItem.styled';

type TodoItemProps = {
   todo: IToDo;
   onIsEditing: (id: number) => void;
};

export function TodoItem({ todo, onIsEditing }: TodoItemProps) {
   const { id, text, completed: todoChecked } = todo;
   // const { deleteTodo } = todoSlice.actions;
   const dispatch = useAppDispatch();

   return (
      <ListItemButton onClick={() => dispatch(toggleTodoThunk(id))}>
         <Checkbox checked={todoChecked} />
         <ItemText
            primary={text}
            style={todoChecked ? { textDecoration: 'line-through' } : {}}
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
               dispatch(deleteTodoThunk(id));
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
