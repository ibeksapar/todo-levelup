import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App.tsx';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <Routes>
               <Route path='/' element={<App />} />
            </Routes>
         </BrowserRouter>
      </Provider>
   </StrictMode>
);
