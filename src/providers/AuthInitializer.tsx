import { useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getUserDataThunk } from '@/store/reducers/authSlice';

export function AuthInitializer() {
   const dispatch = useAppDispatch();
   const token = useAppSelector((state) => state.authReducer.token);
   const initialized = useRef(false);

   useEffect(() => {
      if (!token) return;
      if (initialized.current) return;

      initialized.current = true;
      dispatch(getUserDataThunk());
   }, [dispatch, token]);

   return null;
}
