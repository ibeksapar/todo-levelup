import { Route, Routes } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { LoginForm } from './pages/LoginForm';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivateRoutes } from './pages/PrivateRoutes';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterForm } from './pages/RegisterForm';
import { AuthInitializer } from './providers/AuthInitializer';

function App() {
   return (
      <>
         <Header />
         <AuthInitializer />
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
