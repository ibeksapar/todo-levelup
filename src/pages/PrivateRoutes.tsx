import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/hooks/hooks';

export function PrivateRoutes() {
   const { token } = useAppSelector((state) => state.authReducer);

   return token ? <Outlet /> : <Navigate to='/login' />;
}
