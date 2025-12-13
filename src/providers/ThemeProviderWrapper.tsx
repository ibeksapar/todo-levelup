import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PropsWithChildren, useEffect, useState } from 'react';

import { GlobalStyles } from '@/styles/GlobalStyles';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/localstorage';

import { ThemeContext, ThemeMode } from './ThemeContext';

export function ThemeProviderWrapper({ children }: PropsWithChildren) {
   const [theme, setTheme] = useState<ThemeMode>(
      getLocalStorageItem('theme', 'light')
   );

   useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      setLocalStorageItem('theme', theme);
   }, [theme]);

   const toggleTheme = () =>
      setTheme((t) => (t === 'light' ? 'dark' : 'light'));

   const muiTheme = createTheme({
      palette: { mode: theme },
   });

   return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
         <ThemeProvider theme={muiTheme}>
            <GlobalStyles />
            {children}
         </ThemeProvider>
      </ThemeContext.Provider>
   );
}
