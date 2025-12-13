import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/hooks/hooks';

export function PrivateRoutes() {
   const { token, status } = useAppSelector((state) => state.authReducer);
   if (status === 'loading') return <div>Loading...</div>;

   return token ? <Outlet /> : <Navigate to='/login' />;
}
