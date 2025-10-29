import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
   Checkbox,
   IconButton,
   ListItemButton,
   ListItemText,
} from '@mui/material';
import styled from 'styled-components';

import { useAppDispatch } from '../hooks/hooks';
import { IToDo } from '../models/IToDo';
import { todoSlice } from '../store/reducers/TodoSlice';

const StyledIconButton = styled(IconButton)<{ $hoverColor: string }>`
   && {
      .icon {
         transition: all 0.2s ease;
      }

      &:hover .icon {
         color: ${(props) => props.$hoverColor};
      }
   }
`;

function TodoItem({
   todo,
   onIsEditing,
}: {
   todo: IToDo;
   onIsEditing: (id: number) => void;
}) {
   const { id, task, completed } = todo;
   const { toggleTodo, deleteTodo } = todoSlice.actions;
   const dispatch = useAppDispatch();

   return (
      <ListItemButton onClick={() => dispatch(toggleTodo(id))}>
         <Checkbox checked={completed} />
         <ListItemText
            sx={{
               maxWidth: '140px',
               marginRight: '24px',
               wordWrap: 'normal',
            }}
            primary={task}
            style={completed ? { textDecoration: 'line-through' } : {}}
         />
         <StyledIconButton
            onClick={(e) => {
               e.stopPropagation();
               onIsEditing(id);
            }}
            $hoverColor='#42a5f5'
         >
            <EditIcon className='icon' fontSize='small' color='disabled' />
         </StyledIconButton>
         <StyledIconButton
            onClick={(e) => {
               e.stopPropagation();
               dispatch(deleteTodo(id));
            }}
            $hoverColor='#ff4d4d'
         >
            <RemoveCircleIcon
               className='icon'
               fontSize='small'
               color='disabled'
            />
         </StyledIconButton>
      </ListItemButton>
   );
}

export default TodoItem;
