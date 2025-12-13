import { FormControl, List } from '@mui/material';
import styled from 'styled-components';

export const FiltersContainer = styled.div`
   display: flex;
   justify-content: space-between;
`;

export const SList = styled(List)`
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

export const SFormControl = styled(FormControl)`
   margin: 1;
   min-width: 120;
`;
