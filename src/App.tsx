import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { AddTodo, TodoList } from '@/components';

import { AppContainer } from './App.styled';
import { GlobalStyles } from './GlobalStyles';
import { getLocalStorageItem, setLocalStorageItem } from './utils/localstorage';

function App() {
   const [theme, setTheme] = useState<'light' | 'dark'>(
      getLocalStorageItem('theme', 'light')
   );

   useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      setLocalStorageItem('theme', theme);
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
