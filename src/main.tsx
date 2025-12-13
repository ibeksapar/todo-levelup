import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import { AuthInitializer } from './providers/AuthInitializer.tsx';
import { ThemeProviderWrapper } from './providers/ThemeProviderWrapper.tsx';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Provider store={store}>
         <ThemeProviderWrapper>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </ThemeProviderWrapper>
         <AuthInitializer />
      </Provider>
   </StrictMode>
);
