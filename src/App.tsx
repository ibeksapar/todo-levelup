import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AddTodo, TodoList } from '@/components';

import { GlobalStyles } from './GlobalStyles';

const AppContainer = styled.div`
   top: 10%;
   display: flex;
   flex-direction: column;
   gap: 20px;
`;

function App() {
   const [theme, setTheme] = useState<'light' | 'dark'>(
      (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
   );

   useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
   }, [theme]);

   const muiTheme = createTheme({
      palette: { mode: theme },
   });

   function toggleTheme() {
      setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
   }

   return (
      <ThemeProvider theme={muiTheme}>
         <GlobalStyles />
         <AppContainer>
            <Button variant='outlined' size='small' onClick={toggleTheme}>
               {theme === 'light' ? 'Dark' : 'Light'} theme
            </Button>
            <AddTodo />
            <TodoList />
         </AppContainer>
      </ThemeProvider>
   );
}

export default App;
