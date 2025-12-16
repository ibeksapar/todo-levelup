import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProviderWrapper } from '@/providers';

import App from './App.tsx';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Provider store={store}>
         <ThemeProviderWrapper>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </ThemeProviderWrapper>
      </Provider>
   </StrictMode>
);
