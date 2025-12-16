import { Button } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useTheme } from '@/providers/useTheme';
import { logoutUser } from '@/store/reducers/authSlice';

export function Header() {
   const token = useAppSelector((state) => state.authReducer.token);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   const { theme, toggleTheme } = useTheme();

   const isAuthPage =
      location.pathname === '/login' || location.pathname === '/register';

   const isProfilePage = location.pathname === '/profile';

   if (isAuthPage) return null;

   return (
      <header>
         <Button variant='outlined' size='small' onClick={toggleTheme}>
            {theme === 'light' ? 'Dark' : 'Light'} theme
         </Button>
         <div>
            {isProfilePage && (
               <Button component={NavLink} to='/'>
                  Tasks
               </Button>
            )}
            {token && !isProfilePage && (
               <Button component={NavLink} to='/profile'>
                  Profile
               </Button>
            )}
            {token ? (
               <Button onClick={() => dispatch(logoutUser())}>Log out</Button>
            ) : (
               <Button onClick={() => navigate('/login')}>Log in</Button>
            )}
         </div>
      </header>
   );
}
