import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { loginUserThunk } from '@/store/reducers/authSlice';

import { SForm } from './Form.styled';

export function LoginForm() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [localError, setLocalError] = useState('');
   const { error, status, token } = useAppSelector(
      (state) => state.authReducer
   );
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const isLoading = status === 'loading';

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setLocalError('');
      if (!email || !password) return;

      if (!email.includes('@') || !email.includes('.')) {
         setLocalError('Invalid email');
         return;
      }

      if (password.length < 6) {
         setLocalError('Password must be at least 6 characters');
         return;
      }

      dispatch(loginUserThunk({ email, password }));
   }

   useEffect(() => {
      if (status === 'idle' && token) navigate('/');
   }, [status, token, navigate]);

   return (
      <SForm onSubmit={handleSubmit}>
         <label htmlFor='email'>E-mail</label>
         <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
         />

         <label htmlFor='password'>Password</label>
         <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
         />

         {localError && <p className='error'>{localError}</p>}
         {error && status === 'failed' && (
            <p className='error'>Server error: {error}</p>
         )}
         <button type='submit'>Login</button>

         <Link to='/register'>Registration Page</Link>
      </SForm>
   );
}
