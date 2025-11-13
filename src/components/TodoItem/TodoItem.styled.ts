import { IconButton, ListItemText } from '@mui/material';
import styled from 'styled-components';

export const EditIconButton = styled(IconButton)`
   && {
      .icon {
         transition: all 0.2s ease;
      }

      &:hover .icon {
         color: #42a5f5;
      }
   }
`;

export const DeleteIconButton = styled(IconButton)`
   && {
      .icon {
         transition: all 0.2s ease;
      }

      &:hover .icon {
         color: #ff4d4d;
      }
   }
`;

export const ItemText = styled(ListItemText)`
   max-width: 140px;
   margin-right: 24px;
   word-wrap: 'normal';
`;
