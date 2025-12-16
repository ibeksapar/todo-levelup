import { Route, Routes } from 'react-router-dom';

import { Header } from '@/components';
import {
   HomePage,
   LoginForm,
   NotFoundPage,
   PrivateRoutes,
   ProfilePage,
   RegisterForm,
} from '@/pages';

function App() {
   return (
      <>
         <Header />
         <Routes>
            <Route element={<PrivateRoutes />}>
               <Route path='/' element={<HomePage />} />
               <Route path='/profile' element={<ProfilePage />} />
            </Route>
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='*' element={<NotFoundPage />} />
         </Routes>
      </>
   );
}
export default App;
